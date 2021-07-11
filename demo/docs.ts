import type { TemplateResult } from 'lit';
import { html, LitElement } from 'lit';

class DocsComponent extends LitElement {
  public render(): TemplateResult {
    return html` <div>Documentation here.</div> `;
  }
}

customElements.define('docs-page', DocsComponent);
