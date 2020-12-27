import type { TemplateResult } from 'lit-element';
import { html, LitElement, property } from 'lit-element';

class MyProduct extends LitElement {
  @property({ type: String })
  public id = '';

  @property({ type: String })
  protected name = '';

  public render(): TemplateResult {
    return html`
      <style>
        h1 {
          margin-top: 0;
          margin-bottom: 16px;
        }
      </style>
      <h1>Product ${this.id} ${this.name}</h1>
    `;
  }
}

customElements.define('my-product', MyProduct);
