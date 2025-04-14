import { css, html, LitElement, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

class MyProduct extends LitElement {
  public static override styles = css`
    h1 {
      margin-top: 0;
      margin-bottom: 16px;
    }
  `;

  @property({ type: String })
  public override id = '';

  @property({ type: String })
  protected name = '';

  public override render(): TemplateResult {
    return html`<h1>Product ${this.id} ${this.name}</h1>`;
  }
}

customElements.define('my-product', MyProduct);
