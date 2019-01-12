import { LitElement, html, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { connect, installRouter } from 'pwa-helpers';

import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

import { addRoute, setActiveRoute } from './actions';
import { RouteParams } from './reducer';
import { getRouteParams, isRouteActive, State } from './selectors';

let routerInstalled = false;

// eslint-disable-next-line import/no-mutable-exports, typescript/no-explicit-any
export let RouteClass: any;

export default (store: Store<State> & LazyStore) => {
  /**
   * `<lit-route>` is an element that when browser route matches it
   * the content or the component associated is diplayed
   * @element lit-route
   * @demo ../demo/index.html
   */
  class Route extends connect(store)(LitElement) {
    @property({ type: Boolean })
    active = false;

    @property({ type: String })
    component?: string;

    @property({ type: Object })
    params: RouteParams = {};

    @property({ type: String })
    path?: string;

    firstUpdated() {
      if (!routerInstalled) {
        installRouter((location) => {
          const path = window.decodeURIComponent(location.pathname);
          return store.dispatch(setActiveRoute(path));
        });
        routerInstalled = true;
      }

      if (this.path) {
        store.dispatch(addRoute(this.path));
      }
    }

    stateChanged(state: State) {
      this.active = isRouteActive(state, this.path);
      this.params = getRouteParams(state, this.path);
    }

    render() {
      if (!this.active) {
        return html``;
      }

      if (!this.component) {
        return html`<slot></slot>`;
      }

      const tagName = this.component.replace(/[^A-Za-z-]/, '');
      const attributes = Object
        .keys(this.params)
        .map(param => ` ${param}="${this.params[param]}"`)
        .join('');
      const template = `<${tagName}${attributes}></${tagName}>`;

      return html`${unsafeHTML(template)}`;
    }
  }

  RouteClass = Route;
  window.customElements.define('lit-route', Route);
};

declare global {
  interface Window {
    decodeURIComponent: (encodedURIComponent: string) => string;
  }
}
