import { LitElement, html } from '@polymer/lit-element';

export default class MyProduct extends LitElement {
  render() {
    return html`
      <style>
        h1 {
          margin-top: 0;
          margin-bottom: 16px;
        }
      </style>
      <h1>Product</h1>
    `;
  }
}

customElements.define('my-product', MyProduct);
