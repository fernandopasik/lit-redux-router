import type { TemplateResult } from 'lit-element';
import { customElement, html, internalProperty, LitElement, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { connect, installRouter } from 'pwa-helpers';
import type { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer';
import type { Store } from 'redux';
import type { ReadonlyDeep } from 'type-fest';
import { addRoute, setActiveRoute } from './actions';
import type { State } from './selectors';
import { getRouteParams, isRouteActive } from './selectors';

let routerInstalled = false;

// eslint-disable-next-line @typescript-eslint/init-declarations, import/no-mutable-exports, @typescript-eslint/no-explicit-any
export let RouteClass: any;

export default (store: Readonly<LazyStore & Store>): void => {
  /**
   * Element that renders its content or a component
   * when browser route matches
   * @element lit-route
   * @demo ../demo/index.html
   */
  @customElement('lit-route')
  class Route extends connect(store as LazyStore & Store)(LitElement) {
    @property({ type: Boolean, reflect: true })
    public active = false;

    @property({ type: String })
    public component?: string;

    @property({ type: String })
    public path?: string;

    @property()
    public resolve?: () => Promise<void>;

    @property({ type: String })
    public loading?: string;

    @property({ type: Object })
    public scrollOpt?: ScrollIntoViewOptions | boolean;

    @property({ type: Boolean })
    public scrollDisable = false;

    @internalProperty()
    protected params: Record<string, string> = {};

    @internalProperty()
    protected isResolving = false;

    public firstUpdated(): void {
      if (!routerInstalled) {
        installRouter(({ pathname, search, hash }: ReadonlyDeep<Location>): void => {
          const path = window.decodeURIComponent(pathname + search + hash);
          store.dispatch(setActiveRoute(path));
        });
        routerInstalled = true;
      }

      let current: HTMLElement | Route | null = this.parentElement;
      let { path } = this;

      while (current) {
        const closestLitRoute: Route | null = current.closest('lit-route');

        if (closestLitRoute) {
          path = `${closestLitRoute.path ?? ''}${path ?? ''}`;
        }

        current = closestLitRoute?.parentElement ?? null;
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
        this.setResolving();
        this.resolve()
          .then((): void => {
            this.unsetResolving();
          })
          .catch((): void => {
            this.unsetResolving();
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

    private setResolving(): void {
      if (
        typeof this.component !== 'undefined' &&
        typeof window.customElements.get(this.component) === 'undefined'
      ) {
        this.isResolving = true;
      }
    }

    private unsetResolving(): void {
      if (
        typeof this.component !== 'undefined' &&
        typeof window.customElements.get(this.component) !== 'undefined'
      ) {
        this.isResolving = false;
      }
    }
  }

  RouteClass = Route;
};

declare global {
  interface Window {
    decodeURIComponent: (encodedURIComponent: string) => string;
  }
}
