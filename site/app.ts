import { LitElement, html, css, CSSResult, TemplateResult } from 'lit-element';
import './header';
import './main';

class AppDocs extends LitElement {
  public static get styles(): CSSResult {
    return css`
      :host {
        font-size: 16px;
        line-height: 1.5;
        color: #111;
        background-color: #eceff1;
        --mdc-theme-primary: #2196f3;
      }
    `;
  }

  public render(): TemplateResult {
    return html`
      <style>
        @import url(https://unpkg.com/@material/typography/dist/mdc.typography.min.css);
      </style>
      <div class="app mdc-typography">
        <app-header></app-header>
        <app-main></app-main>
      </div>
    `;
  }
}

customElements.define('app-docs', AppDocs);
