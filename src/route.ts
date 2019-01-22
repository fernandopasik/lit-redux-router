import {
  LitElement,
  html,
  property,
  customElement,
  TemplateResult,
} from '@polymer/lit-element';
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
  // eslint-disable-next-line typescript/no-explicit-any
  @customElement('lit-route' as any)
  class Route extends connect(store)(LitElement) {
    @property({ type: Boolean, reflect: true })
    private active = false;

    @property({ type: String })
    private component?: string;

    @property({ type: Object })
    private params: RouteParams = {};

    @property({ type: String })
    private path?: string;

    public firstUpdated(): void {
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

    public stateChanged(state: State): void {
      this.active = isRouteActive(state, this.path);
      this.params = getRouteParams(state, this.path);
    }

    public render(): TemplateResult {
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
};

declare global {
  interface Window {
    decodeURIComponent: (encodedURIComponent: string) => string;
  }
}
