import { css, html, LitElement, type TemplateResult } from 'lit';

class MyLoading extends LitElement {
  public static override styles = css`
    h1 {
      margin-top: 0;
      margin-bottom: 16px;
    }
  `;

  public override render(): TemplateResult {
    return html`<h1>Loading...</h1>`;
  }
}

customElements.define('my-loading', MyLoading);
