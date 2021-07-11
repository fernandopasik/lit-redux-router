import type { TemplateResult } from 'lit';
import { html, LitElement } from 'lit';

class MyLoading extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        h1 {
          margin-top: 0;
          margin-bottom: 16px;
        }
      </style>
      <h1>Loading...</h1>
    `;
  }
}

customElements.define('my-loading', MyLoading);
