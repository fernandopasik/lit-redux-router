import { LitElement, html, property } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

import { addRoute } from './actions';
import { State } from './reducer';
import { getRouteParams, isRouteActive } from './selectors';

export default (store: Store<State> & LazyStore) => {
  class Route extends connect(store)(LitElement) {
    @property({ type: Boolean })
    active = false;

    @property({ type: String })
    component;

    @property({ type: Object })
    params = {};

    @property({ type: String })
    path;

    firstUpdated() {
      store.dispatch(addRoute(this.path));
    }

    stateChanged(state) {
      this.active = isRouteActive(state, this.path);
      this.params = getRouteParams(state, this.path);
    }

    getComponentTemplate() {
      const tagName = this.component.replace(/[^A-Za-z-]/, '');
      const attributes = Object
        .keys(this.params)
        .map(param => ` ${param}="${this.params[param]}"`)
        .join('');
      const template = `<${tagName}${attributes}></${tagName}>`;

      return html`${unsafeHTML(template)}`;
    }

    render() {
      if (!this.active) {
        return html``;
      }

      return this.component
        ? this.getComponentTemplate()
        : html`<slot></slot>`;
    }
  }

  customElements.define('lit-route', Route);
};
