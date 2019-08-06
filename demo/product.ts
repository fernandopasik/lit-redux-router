import { LitElement, html, property, TemplateResult } from 'lit-element';

class MyProduct extends LitElement {
  @property({ type: String })
  private id: string;

  @property({ type: String })
  private name: string;

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
