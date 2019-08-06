import { LitElement, html, TemplateResult } from 'lit-element';
import './code-example';

class AppGettingStarted extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        @import url(https://unpkg.com/@material/typography/dist/mdc.typography.min.css);
      </style>
      <h2 class="mdc-typography--headline3">Getting Started</h2>

      <p>Install this library and its peer dependencies</p>

      <pre><code-example language="shell">
        yarn add lit-redux-router
        yarn add lit-html lit-element pwa-helpers redux
      </code-example></pre>

      <p>First the router needs to connect to a redux store.</p>

      <pre><code-example>
        import { LitElement, html } from 'lit-element';
        import { connectRouter } from 'lit-redux-router';
        import store from './store';
        connectRouter(store);
      </code-example></pre>

      <p>Add a <i>lit-route</i> element with a specific path and content</p>

      <pre><code-example>
        class MyApp extends LitElement {
          render() {
            return html&#96;
              <div class="app-content">
                <lit-route path="/"><h1>Home</h1></lit-route>
              </div>
            &#96;;
          }
        }
        customElements.define('my-app', MyApp);
      </code-example></pre>
    `;
  }
}

customElements.define('app-getting-started', AppGettingStarted);
