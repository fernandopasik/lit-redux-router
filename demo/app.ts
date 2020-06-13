import { html, LitElement, TemplateResult } from 'lit-element';
import { connectRouter, navigate } from '../src/lit-redux-router';
import './contact';
import './loading';
import './product';
import store from './store';

connectRouter(store);

interface TestState {
  test: boolean;
}

const testReducer = (state = { test: true }, { type = '' }): TestState => {
  switch (type) {
    case 'TEST_FALSE':
      return { test: false };
    case 'TEST_TRUE':
      return { test: true };
    default:
      return state;
  }
};

store.addReducers({ test: testReducer });

class MyApp extends LitElement {
  public goToAbout(): void {
    store.dispatch(navigate('/about'));
  }

  public triggerStateChange(): void {
    store.dispatch({ type: 'TEST_FALSE' });
  }

  public importDocs(): typeof import('./docs') {
    return import('./docs');
  }

  public render(): TemplateResult {
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
        .spacer {
          height: 1600px;
        }

        .scrollLink {
          color: blue;
        }

        .scrollLink:hover {
          color: red;
        }
      </style>
      <div class="app-bar">Example App</div>
      <nav class="nav-bar">
        <a href="/">home</a>
        <a href="/products/1/shirt">products</a>
        <a href="/about">about</a>
        <a href="/contact">contact</a>
        <a href="/docs">lazy</a>
        <a href="/not-exist">not exist</a>
      </nav>

      <div class="app-content">
        <lit-route><h1>404</h1></lit-route>
        <lit-route path="/">
          <h1>Home</h1>
          <button @click="${this.goToAbout}">learn more about us</button>
        </lit-route>
        <lit-route path="/products/:id?/:name?" component="my-product"></lit-route>
        <lit-route path="/about">
          <h1>About</h1>
          <a href="/about/me">Me</a>
          <lit-route path="/me">
            <h1>About Me</h1>
          </lit-route>
        </lit-route>
        <lit-route path="/contact" component="my-contact" scrollDisable> </lit-route>
        <lit-route
          path="/docs"
          component="docs-page"
          .resolve="${this.importDocs}"
          .scrollOpt="${{ behavior: 'smooth', block: 'end', inline: 'nearest' }}"
          loading="my-loading"
        ></lit-route>
        <div class="spacer"></div>
        <button @click="${this.triggerStateChange}">trigger other state change</button>
        <br />
        <a href="/contact" class="scrollLink">Scroll disabled</a><br />
        <a href="/docs" class="scrollLink">Scroll to top smoothly and switch to docs component</a>
      </div>
    `;
  }
}

customElements.define('my-app', MyApp);
