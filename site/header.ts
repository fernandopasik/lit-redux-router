/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, html, css, CSSResult, TemplateResult } from 'lit-element';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';

class AppHeader extends LitElement {
  public static get styles(): CSSResult {
    return css`
      .title {
        color: inherit;
        text-decoration: none;
      }
    `;
  }

  public render(): TemplateResult {
    return html`
      <header>
        <mwc-top-app-bar type="fixed">
          <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
          <a slot="title" class="title" href="/">Lit Redux Router</a>
          <a
            href="https://github.com/fernandopasik/lit-redux-router"
            aria-label="Github Repo"
            slot="actionItems"
          >
            <icon-github color="white"></icon-github>
          </a>
        </mwc-top-app-bar>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
