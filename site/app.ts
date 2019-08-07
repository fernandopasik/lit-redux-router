import { LitElement, html, property, css, CSSResult, TemplateResult } from 'lit-element';
import './header';
import './main';
import './content-table';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@material/mwc-drawer';

class AppDocs extends LitElement {
  @property({ type: Boolean })
  public drawerOpen: boolean = false;

  public static get styles(): CSSResult {
    return css`
      :host {
        font-size: 16px;
        line-height: 1.5;
        color: #111;
        background-color: #eceff1;
        --mdc-theme-primary: #2196f3;
      }

      .main-content {
        width: 100vw;
      }

      app-content-table {
        display: block;
        padding: 0 16px;
      }
    `;
  }

  public openDrawer(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  public render(): TemplateResult {
    return html`
      <style>
        @import url(https://unpkg.com/@material/typography/dist/mdc.typography.min.css);
      </style>
      <div class="app mdc-typography">
        <mwc-drawer hasHeader type="modal" ?open=${this.drawerOpen}>
          <span slot="title">Content table</span>
          <app-content-table></app-content-table>
          <div slot="appContent">
            <app-header @menu-open="${this.openDrawer}"></app-header>
            <div class="main-content">
              <app-main></app-main>
            </div>
          </div>
        </mwc-drawer>
      </div>
    `;
  }
}

customElements.define('app-docs', AppDocs);
