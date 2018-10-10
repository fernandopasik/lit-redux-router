import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

export default (store: Store & LazyStore) => {
  class Route extends connect(store)(LitElement) {
    render() {
      return html`<slot></slot>`;
    }
  }

  customElements.define('lit-route', Route);
};
