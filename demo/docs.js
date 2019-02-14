import { LitElement, html } from './node_modules/lit-element/lit-element.js';

class DocsComponent extends LitElement {
  render() {
    return html`
      <div>
          Documentation here.
      </div>
    `;
  }
}

customElements.define('docs-page', DocsComponent);
