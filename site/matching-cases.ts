import { LitElement, html, TemplateResult } from 'lit-element';
import './code-example';

class MatchingCases extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        @import url(https://unpkg.com/@material/typography/dist/mdc.typography.min.css);
      </style>
      <h2 class="mdc-typography--headline3">Matching cases for paths</h2>

      <p></p>

      <h3 id="text-path" class="mdc-typography--headline4">Plain text</h3>

      <pre><code-example>
        class MyAbout extends LitElement {
          render() {
            return html&#96;
              <div class="app-content">
                <lit-route path="/about"><h1>About</h1></lit-route>
                <lit-route path="/team"><h1>Team</h1></lit-route>
              </div>
            &#96;;
          }
        }
        customElements.define('my-app', MyAbout);
      </code-example></pre>

      <h3 id="path-with-variables" class="mdc-typography--headline4">With variables</h3>

      <p>lit-route can **map path variables** and inject them in the provided component.</p>

      <pre><code-example>
        class AppProduct extends LitElement {
          static get properties() {
            return {
              id: String,
            };
          }

          render() {
            return html&#96;<h1>Product with id: \${this.id}</h1>&#96;;
          }
        }
        customElements.define('app-product', AppProduct);

        class MyApp extends LitElement {
          render() {
            return html&#96;
              <div class="app-content">
                <lit-route path="/products/:id" component="app-product"></lit-route>
              </div>
            &#96;;
          }
        }
        customElements.define('my-app', MyApp);
      </code-example></pre>

      <h3 id="not-found-path" class="mdc-typography--headline4">Not found path</h3>

      <p>
        When no path attribute is provided to lit-route, it will render when no route matches (404)
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

      <h3 id="every-route-except-matching-route" class="mdc-typography--headline4">
        Every route except matching route
      </h3>
    `;
  }
}

customElements.define('app-matching-cases', MatchingCases);
