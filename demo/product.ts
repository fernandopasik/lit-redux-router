import { html, LitElement, property, TemplateResult } from 'lit-element';

class MyProduct extends LitElement {
  @property({ type: String })
  public id: string = '';

  @property({ type: String })
  protected name: string = '';

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
