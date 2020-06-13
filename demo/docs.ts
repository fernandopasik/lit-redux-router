import { html, LitElement, TemplateResult } from 'lit-element';

class DocsComponent extends LitElement {
  public render(): TemplateResult {
    return html`
      <div>
        Documentation here.
      </div>
    `;
  }
}

customElements.define('docs-page', DocsComponent);
