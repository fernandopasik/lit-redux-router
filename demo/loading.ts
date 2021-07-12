import type { TemplateResult } from 'lit';
import { css, html, LitElement } from 'lit';

class MyLoading extends LitElement {
  public static styles = css`
    h1 {
      margin-top: 0;
      margin-bottom: 16px;
    }
  `;

  public render(): TemplateResult {
    return html`<h1>Loading...</h1>`;
  }
}

customElements.define('my-loading', MyLoading);
