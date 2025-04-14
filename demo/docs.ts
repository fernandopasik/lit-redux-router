import { html, LitElement, type TemplateResult } from 'lit';

class DocsComponent extends LitElement {
  public override render(): TemplateResult {
    return html` <div>Documentation here.</div> `;
  }
}

customElements.define('docs-page', DocsComponent);
