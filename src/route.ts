import { LitElement, html, property } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { connect, installRouter } from 'pwa-helpers';

import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

import { addRoute, navigate } from './actions';
import { State } from './reducer';
import { getRouteParams, isRouteActive } from './selectors';

let routerInstalled = false;
export let RouteClass;

export default (store: Store<State> & LazyStore) => {
  class Route extends connect(store)(LitElement) {
    @property({ type: Boolean })
    active = false;

    @property({ type: String })
    component;

    @property({ type: Object })
    params = {};

    @property({ type: String })
    path;

    firstUpdated() {
      if (!routerInstalled) {
        installRouter((location) => {
          const path = window.decodeURIComponent(location.pathname);
          return store.dispatch(navigate(path));
        });
        routerInstalled = true;
      }

      store.dispatch(addRoute(this.path));
    }

    stateChanged(state) {
      this.active = isRouteActive(state, this.path);
      this.params = getRouteParams(state, this.path);
    }

    getComponentTemplate() {
      const tagName = this.component.replace(/[^A-Za-z-]/, '');
      const attributes = Object
        .keys(this.params)
        .map(param => ` ${param}="${this.params[param]}"`)
        .join('');
      const template = `<${tagName}${attributes}></${tagName}>`;

      return html`${unsafeHTML(template)}`;
    }

    render() {
      if (!this.active) {
        return html``;
      }

      return this.component
        ? this.getComponentTemplate()
        : html`<slot></slot>`;
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
