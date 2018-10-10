import { LitElement, html } from '@polymer/lit-element';

import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

export default (store: Store & LazyStore) => {
  class Router extends LitElement {
    render() {
      return html`<slot></slot>`;
    }
  }

  customElements.define('lit-router', Router);
};
