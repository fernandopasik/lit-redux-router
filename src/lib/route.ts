import type { TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { connect, installRouter } from 'pwa-helpers';
import type { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';
import type { Store } from 'redux';
import { addRoute, setActiveRoute } from './actions.js';
import type { State } from './selectors.js';
import { getRouteParams, isRouteActive } from './selectors.js';

// eslint-disable-next-line @typescript-eslint/init-declarations, import/no-mutable-exports, @typescript-eslint/no-explicit-any
export let RouteClass: any;

export default (store: LazyStore & Store): void => {
  //
  /**
   * Element that renders its content or a component
   * when browser route matches
   * @element lit-route
   * @demo ../demo/index.html
   */
  @customElement('lit-route')
  class Route extends connect(store)(LitElement) {
    private static routerInstalled = false;

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

    @state()
    protected params: Record<string, string> = {};

    @state()
    protected isResolving = false;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    public async firstUpdated(): Promise<void> {
      await this.updateComplete;
      if (!Route.routerInstalled) {
        installRouter(({ pathname, search, hash }: Location): void => {
          const path = window.decodeURIComponent(pathname + search + hash);
          store.dispatch(setActiveRoute(path));
        });
        Route.routerInstalled = true;
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

    public stateChanged(newState: State): void {
      const isActive = isRouteActive(newState, this.path);
      const hasBecomeActive = !this.active && isActive;
      this.active = isActive;
      this.params = getRouteParams(newState, this.path);

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

    public render(): TemplateResult | typeof nothing {
      if (!this.active) {
        return nothing;
      }

      if (this.resolve && this.isResolving) {
        return typeof this.loading === 'undefined' ? nothing : this.getTemplate(this.loading);
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
