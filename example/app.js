import { LitElement, html } from '@polymer/lit-element';

import { connectRouter } from '../lib/index.js';
import store from './store.js';

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

        .app-bar {
          color: white;
          background-color: #2196f3;
          font-size: 20px;
          padding: 20px;
          text-align: center;
        }

        .nav-bar {
          background-color: white;
          text-align: center;
        }

        .nav-bar a {
          display: inline-block;
          padding: 20px;
        }
      </style>
      <div class="app-bar">Example App</div>
      <nav class="nav-bar">
        <a href="/">home</a>
        <a href="/view-1">view 1</a>
        <a href="/view-2">view 2</a>
        <a href="/view-3">view 3</a>
      </nav>

      <lit-router>
          <lit-route path="/">
            <h1>Home</h1>
          </lit-route>
          <lit-route path="/view-1">
            <h1>View 1</h1>
          </lit-route>
          <lit-route path="/view-2">
            <h1>View 2</h1>
          </lit-route>
          <lit-route path="/view-3">
            <h1>View 3</h1>
          </lit-route>
        </lit-router>
    `;
  }
}

customElements.define('my-app', MyApp);
