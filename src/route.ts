import {
  LitElement,
  html,
  property,
  customElement,
  TemplateResult,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { connect, installRouter } from 'pwa-helpers';

import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

import { addRoute, setActiveRoute } from './actions';
import { RouteParams } from './reducer';
import { getRouteParams, isRouteActive, State } from './selectors';

let routerInstalled = false;

// eslint-disable-next-line import/no-mutable-exports, @typescript-eslint/no-explicit-any
export let RouteClass: any;

export default (store: Store<State> & LazyStore) => {
  /**
   * Element that renders its content or a component
   * when browser route matches
   * @element lit-route
   * @demo ../demo/index.html
   */
  @customElement('lit-route')
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

    private getTemplate(component: string, attributesObject?: object): TemplateResult {
      const tagName = component.replace(/[^A-Za-z-]/, '');
      let attributes = '';

      if (attributesObject) {
        attributes = Object
          .keys(attributesObject)
          .map(param => ` ${param}="${this.params[param]}"`)
          .join('');
      }

      const template = `<${tagName}${attributes}></${tagName}>`;

      return html`${unsafeHTML(template)}`;
    }

    public render(): TemplateResult {
      if (!this.active) {
        return html``;
      }

      if (!this.component) {
        return html`<slot></slot>`;
      }

      return this.getTemplate(this.component, this.params);
    }
  }

  RouteClass = Route;
};

declare global {
  interface Window {
    decodeURIComponent: (encodedURIComponent: string) => string;
  }
}
