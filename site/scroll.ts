import { LitElement, html, TemplateResult } from 'lit-element';
import './code-example';

class Scroll extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        @import url(https://unpkg.com/@material/typography/dist/mdc.typography.min.css);
      </style>
      <h2 class="mdc-typography--headline4">Scroll</h2>

      <p></p>

      <h3 id="text-path" class="mdc-typography--headline5">with links</h3>

      <p></p>

      <pre><code-example>
        class MyApp extends LitElement {
          render() {
            return html&#96;
              <nav>
                <a href="/about">About</a>
                <a href="/team">Team</a>
              </nav>
              <div class="app-content">
                <lit-route path="/about"><h1>About</h1></lit-route>
                <lit-route path="/team"><h1>Team</h1></lit-route>
              </div>
            &#96;;
          }
        }
        customElements.define('my-app', MyApp);
      </code-example></pre>

      <h3 id="text-path" class="mdc-typography--headline5">with a redux action</h3>

      <p></p>

      <pre><code-example>
      </code-example></pre>
    `;
  }
}

customElements.define('app-scroll', Scroll);
