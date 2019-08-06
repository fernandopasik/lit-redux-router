import { LitElement, html, TemplateResult } from 'lit-element';

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
