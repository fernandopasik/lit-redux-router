import { LitElement, html, TemplateResult } from 'lit-element';

class AppNotFound extends LitElement {
  public render(): TemplateResult {
    return html`
      <h2>Route not Found</h2>
      <p>
        This route is active when 404 happens. To achieve this, a lit-route element must be present
        without the path attribute
      </p>

      <pre>
        <code>
          <main>
            <lit-route path="/getting-started" component="app-getting-started"></lit-route>
            <lit-route component="app-not-found"></lit-route>
          </main>
        </code>
      </pre>
    `;
  }
}

customElements.define('app-not-found', AppNotFound);
