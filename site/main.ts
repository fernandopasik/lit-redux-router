import { LitElement, html, css, CSSResult, TemplateResult } from 'lit-element';
import { connectRouter } from '../src/lit-redux-router';
import store from './store';

import './home';
import './not-found';
import './footer';
import './github';
import './content-table';
import './getting-started';
import './render-content';
import './matching-cases';

connectRouter(store);

class AppMain extends LitElement {
  public static get styles(): CSSResult {
    return css`
      .app-main {
        --aside-width: 320px;
        max-width: 1260px;
        margin: 0 auto;
        position: relative;
        padding-right: var(--aside-width);
        box-sizing: border-box;
      }

      main {
        min-height: 720px;
        box-sizing: border-box;
        padding: 80px 40px 20px 20px;
      }

      aside {
        box-sizing: border-box;
        padding: 113px 20px 20px 40px;
        position: fixed;
        height: 100%;
        top: 0;
        right: 0;
        width: calc((100vw - 1260px) / 2 + var(--aside-width));
        background-color: #eceff1;
      }

      @media (max-width: 1260px) {
        aside {
          width: var(--aside-width);
        }
      }

      aside a {
        color: inherit;
        text-decoration: none;
      }

      aside a:hover {
        text-decoration: underline;
      }

      aside ul {
        list-style: none;
        padding: 0;
      }

      aside li {
        margin: 10px 0;
      }

      aside ul ul {
        margin-left: 20px;
      }

      aside ul ul li {
        margin: 5px 0;
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
        </main>
        <aside>
          <app-content-table></app-content-table>
        </aside>
        <app-footer></app-footer>
      </div>
    `;
  }
}

customElements.define('app-main', AppMain);
