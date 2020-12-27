import type { TemplateResult } from 'lit-element';
import { html, LitElement } from 'lit-element';

class DocsComponent extends LitElement {
  public render(): TemplateResult {
    return html` <div>Documentation here.</div> `;
  }
}

customElements.define('docs-page', DocsComponent);
