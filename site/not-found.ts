import { LitElement, html, TemplateResult } from 'lit-element';

class NotFound extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        @import url(https://unpkg.com/@material/typography/dist/mdc.typography.min.css);
      </style>
      <h2 class="mdc-typography--headline4">Route not Found</h2>

      <p>
        This route is active when 404 happens. To achieve this, a lit-route element must be present
        without the path attribute
      </p>

      <pre><code-example>
        class MyApp extends LitElement {
          render() {
            return html&#96;
              <div class="app-content">
                <lit-route path="/"><h1>Home</h1></lit-route>
                <lit-route><h1>404 Not found</h1></lit-route>
              </div>
            &#96;;
          }
        }
        customElements.define('my-app', MyApp);
      </code-example></pre>
    `;
  }
}

customElements.define('app-not-found', NotFound);
