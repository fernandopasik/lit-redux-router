import { LitElement, html } from '@polymer/lit-element';

import { connectRouter } from '../dist/index.js';
import store from './store.js';
import './products.js';

connectRouter(store);

export default class MyApp extends LitElement {
  render() {
    return html`
      <style>
        :host {
          font-family: sans-serif;
          font-weight: 300;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        a:hover {
          text-decoration: underline;
        }

        h1 {
          margin-top: 0;
          margin-bottom: 16px;
        }

        .app-bar {
          color: white;
          background-color: #2196f3;
          font-size: 20px;
          padding: 16px;
          text-align: center;
        }

        .app-content {
          padding: 16px;
        }

        .nav-bar {
          background-color: white;
          text-align: center;
        }

        .nav-bar a {
          display: inline-block;
          padding: 16px;
        }
      </style>
      <div class="app-bar">Example App</div>
      <nav class="nav-bar">
        <a href="/">home</a>
        <a href="/products/1/shirt">products</a>
        <a href="/about">about</a>
        <a href="/contact">contact</a>
      </nav>

      <div class="app-content">
        <lit-route path="/">
          <h1>Home</h1>
        </lit-route>
        <lit-route path="/products/:id?/:name?" component="my-product"></lit-route>
        <lit-route path="/about">
          <h1>About</h1>
        </lit-route>
        <lit-route path="/contact">
          <h1>Contact</h1>
        </lit-route>
      </div>
    `;
  }
}

customElements.define('my-app', MyApp);
