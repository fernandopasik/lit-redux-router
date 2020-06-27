import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { connect, installRouter } from 'pwa-helpers';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer';
import { Store } from 'redux';
import type { ReadonlyDeep } from 'type-fest';
import { addRoute, setActiveRoute } from './actions';
import { RouteParams } from './reducer';
import { getRouteParams, isRouteActive, State } from './selectors';

let routerInstalled = false;

// eslint-disable-next-line import/no-mutable-exports, @typescript-eslint/no-explicit-any
export let RouteClass: any;

export default (store: Readonly<Store & LazyStore>): void => {
  /**
   * Element that renders its content or a component
   * when browser route matches
   * @element lit-route
   * @demo ../demo/index.html
   */
  @customElement('lit-route')
  class Route extends connect(store as Store & LazyStore)(LitElement) {
    @property({ type: Boolean, reflect: true })
    protected active: boolean = false;

    @property({ type: String })
    protected component?: string;

    @property({ type: Object })
    protected params: RouteParams = {};

    @property({ type: String })
    protected path?: string;

    @property({ type: Boolean })
    protected isResolving: boolean = false;

    @property({ type: Function })
    protected resolve?: () => Promise<void>;

    @property({ type: String })
    protected loading?: string;

    @property({ type: Object })
    protected scrollOpt?: boolean | ScrollIntoViewOptions;

    @property({ type: Boolean })
    protected scrollDisable: boolean = false;

    public firstUpdated(): void {
      if (!routerInstalled) {
        installRouter(({ pathname, search, hash }: ReadonlyDeep<Location>): void => {
          const path = window.decodeURIComponent(pathname + search + hash);
          store.dispatch(setActiveRoute(path));
        });
        routerInstalled = true;
      }

      let current: Route | HTMLElement | null = this.parentElement;
      let { path } = this;

      while (current) {
        const closestLitRoute = current.closest('lit-route') as Route;

        if (closestLitRoute) {
          path = `${closestLitRoute.path}${path}`;
        }

        current = closestLitRoute && closestLitRoute.parentElement;
      }

      const hasChildRoutes = Boolean(this.querySelector('lit-route'));

      if (hasChildRoutes) {
        path += '.*';
      }

      this.path = path;

      if (typeof this.path !== 'undefined') {
        store.dispatch(addRoute(this.path));
      }
    }

    public stateChanged(state: ReadonlyDeep<State>): void {
      const isActive = isRouteActive(state, this.path);
      const hasBecomeActive = !this.active && isActive;
      this.active = isActive;
      this.params = getRouteParams(state, this.path);

      if (this.active && this.resolve) {
        this.isResolving = true;
        this.resolve()
          .then((): void => {
            this.isResolving = false;
          })
          .catch((): void => {
            this.isResolving = false;
          });
      }
      if (this.active && !this.scrollDisable) {
        if (typeof this.scrollOpt !== 'undefined') {
          if (hasBecomeActive) {
            this.scrollIntoView(this.scrollOpt);
          }
        } else {
          window.scrollTo(0, 0);
        }
      }
    }

    private getTemplate(
      component: string,
      attributesObject?: Record<string, unknown>,
    ): TemplateResult {
      const tagName = component.replace(/[^A-Za-z0-9-]/, '');
      let attributes = '';

      if (attributesObject) {
        attributes = Object.keys(attributesObject)
          .map((param: string): string => ` ${param}="${this.params[param]}"`)
          .join('');
      }

      const template = `<${tagName}${attributes}></${tagName}>`;

      return html`${unsafeHTML(template)}`;
    }

    public render(): TemplateResult {
      if (!this.active) {
        return html``;
      }

      if (this.resolve && this.isResolving) {
        return typeof this.loading === 'undefined' ? html`` : this.getTemplate(this.loading);
      }

      if (typeof this.component === 'undefined') {
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
