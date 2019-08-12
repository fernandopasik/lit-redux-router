import { LitElement, html, css, CSSResult, TemplateResult } from 'lit-element';
import { connectRouter } from '../src/lit-redux-router';
import store from './store';

import './home';
import './not-found';
import './footer';
import './github';
import './getting-started';
import './render-content';
import './matching-cases';
import './trigger-a-route';
import './scroll';

connectRouter(store);

class AppMain extends LitElement {
  public static get styles(): CSSResult {
    return css`
      .app-main {
        max-width: 1260px;
        margin: 0 auto;
        box-sizing: border-box;
      }

      main {
        min-height: 720px;
        padding: 64px 24px 0;
      }
    `;
  }

  public render(): TemplateResult {
    return html`
      <style>
        @import url(https://unpkg.com/@material/typography/dist/mdc.typography.min.css);
      </style>
      <div class="app-main">
        <main>
          <lit-route component="app-not-found"></lit-route>
          <lit-route path="/" component="app-home"></lit-route>
          <lit-route path="/getting-started" component="app-getting-started"></lit-route>
          <lit-route path="/render-content-for-a-route" component="app-render-content"></lit-route>
          <lit-route
            path="/matching-cases-for-route-paths"
            component="app-matching-cases"
          ></lit-route>
          <lit-route path="/trigger-a-route" component="app-trigger-route"></lit-route>
          <lit-route path="/scroll" component="app-scroll"></lit-route>
        </main>
        <app-footer></app-footer>
      </div>
    `;
  }
}

customElements.define('app-main', AppMain);
