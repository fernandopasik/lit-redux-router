import { LitElement, html } from '@polymer/lit-element';

export default class MyProduct extends LitElement {
  render() {
    return html`<h1>Product</h1>`;
  }
}

customElements.define('my-product', MyProduct);
