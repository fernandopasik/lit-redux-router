# Lit Redux Router

[![Gzip Bundle Size][badge-size]][url-size]
[![Published on webcomponents.org][badge-wc]][url-wc]
[![Build Status][badge-ci]][url-ci]
[![Coverage Status][badge-cov]][url-cov]
[![Known Vulnerabilities][badge-sec]][url-sec]

[![npm version][badge-version]][url-version]
[![Dependency Status][badge-deps]][url-deps]
[![peerDependency Status][badge-deps-peer]][url-deps-peer]
[![devDependency Status][badge-deps-dev]][url-deps-dev]

[badge-size]: http://img.badgesize.io/https://unpkg.com/lit-redux-router/dist/lit-redux-router.min.js?compression=gzip
[badge-wc]: https://img.shields.io/badge/webcomponents.org-published-blue.svg
[badge-ci]: https://circleci.com/gh/fernandopasik/lit-redux-router.svg?style=svg
[badge-cov]: https://codecov.io/gh/fernandopasik/lit-redux-router/branch/master/graph/badge.svg
[badge-sec]: https://snyk.io/test/github/fernandopasik/lit-redux-router/badge.svg?targetFile=package.json
[badge-version]: https://img.shields.io/npm/v/lit-redux-router.svg
[badge-deps]: https://david-dm.org/fernandopasik/lit-redux-router/status.svg
[badge-deps-peer]: https://david-dm.org/fernandopasik/lit-redux-router/peer-status.svg
[badge-deps-dev]: https://david-dm.org/fernandopasik/lit-redux-router/dev-status.svg

[url-size]: https://unpkg.com/lit-redux-router/dist/lit-redux-router.min.js "Gzip Bundle Size"
[url-wc]: https://webcomponents.org/element/lit-redux-router
[url-ci]: https://circleci.com/gh/fernandopasik/lit-redux-router "Build Status"
[url-cov]: https://codecov.io/gh/fernandopasik/lit-redux-router "Coverage Status"
[url-sec]: https://snyk.io/test/github/fernandopasik/lit-redux-router?targetFile=package.json "Known Vulnerabilities"
[url-version]: https://www.npmjs.com/package/lit-redux-router "npm version"
[url-deps]: https://david-dm.org/fernandopasik/lit-redux-router "Dependency Status"
[url-deps-peer]: https://david-dm.org/fernandopasik/lit-redux-router?type=peer "Peer Dependency Status"
[url-deps-dev]: https://david-dm.org/fernandopasik/lit-redux-router?type=dev "Dev Dependency Status"

Declarative way of routing for [lit-html](https://github.com/Polymer/lit-html) powered by [pwa-helpers](https://github.com/Polymer/pwa-helpers), [redux](https://redux.js.org/) and [lit-element](https://github.com/Polymer/lit-element).

A minimal router solution (~1.5 kb Gzipped) that consist in using `lit-route` elements and **connecting** them to the store.

The routing approach is based on the [PWA Starter Kit](https://github.com/polymer/pwa-starter-kit).

## Install

Install this library and its peer dependencies

```
yarn add lit-redux-router
yarn add lit-html lit-element pwa-helpers redux
```

## Usage

First the router needs to **connect to a redux store**.

```js
import { LitElement, html } from 'lit-element';
import { connectRouter } from 'lit-redux-router';
import store from './store.js';

connectRouter(store);
```

`lit-route` component can render the components when the **path attribute** matches. The corresponding active `lit-route` element will reflect the **active attribute**.

```js
class MyApp extends LitElement {
  render() {
    return html`
      <div class="app-content">
        <lit-route path="/" active><h1>Home</h1></lit-route>
        <lit-route path="/about"><h1>About</h1></lit-route>
      </div>
    `;
  }
}
customElements.define('my-app', MyApp);
```

Ideally all content would be in a component and can be passed to `lit-route` through a **component attribute**.

```js
class AppHome extends LitElement {
  render() {
    return html`<h1>Home</h1>`;
  }
}
customElements.define('app-home', AppHome);

class AppAbout extends LitElement {
  render() {
    return html`<h1>About</h1>`;
  }
}
customElements.define('app-about', AppAbout);

class MyApp extends LitElement {
  render() {
    return html`
      <div class="app-content">
        <lit-route path="/" component="app-home"></lit-route>
        <lit-route path="/about" component="app-about"></lit-route>
      </div>
    `;
  }
}
customElements.define('my-app', MyApp);
```

`lit-route` can **map path variables** and inject them in the provided component.

```js
class AppProduct extends LitElement {
  static get properties() {
    return {
      id: String,
    };
  }

  render() {
    return html`<h1>Product with id: ${this.id}</h1>`;
  }
}
customElements.define('app-product', AppProduct);

class MyApp extends LitElement {
  render() {
    return html`
      <div class="app-content">
        <lit-route path="/products/:id" component="app-product"></lit-route>
      </div>
    `;
  }
}
customElements.define('my-app', MyApp);
```

When no path attribute is provided to `lit-route`, it will render when no route matches (404)

```js
class MyApp extends LitElement {
  render() {
    return html`
      <div class="app-content">
        <lit-route path="/"><h1>Home</h1></lit-route>
        <lit-route><h1>404 Not found</h1></lit-route>
      </div>
    `;
  }
}
customElements.define('my-app', MyApp);
```

To trigger navigation without using a link element, the action `navigate` can be imported and triggered with the wanted path

```js
import { navigate } from 'lit-redux-router';
import store from './store.js';

class MyApp extends LitElement {
  goTo(path) {
    store.dispatch(navigate(path));
  }

  render() {
    return html`
      <div class="app-content">
        <button @click="${() => this.goTo('/about')}">learn more about us</button>
      </div>
    `;
  }
}
customElements.define('my-app', MyApp);
```

To lazy load a component on route change and optionally show a loading component while waiting for the import to resolve

```js
import { navigate } from 'lit-redux-router';
import store from './store.js';

class MyApp extends LitElement {
  render() {
    return html`
      <div class="app-content">
        <lit-route
          path="/docs"
          component="my-docs"
          .resolve="${() => import('./docs.js')}"
          loading="my-loading"
        ></lit-route>
      </div>
    `;
  }
}
customElements.define('my-app', MyApp);

class MyLoading extends LitElement {
  render() {
    return html`
      <style>
        h1 {
          margin-top: 0;
          margin-bottom: 16px;
        }
      </style>
      <h1>Loading...</h1>
    `;
  }
}

customElements.define('my-loading', MyLoading);
```



The window will scroll to top by default, to disable add the attribute `scrollDisable`

```html
<lit-route
  path="/whatever"
  component="my-whatever"
  scrollDisable
></lit-route>
```

To scroll to the route element on load, you can set the [scrollIntoViewOptions](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#Example) object in the attribute `.scrollOpt`

```html
<lit-route
  path="/whatever"
  component="my-whatever"
  .scrollOpt="${{behavior: 'smooth', block:'end', inline:'nearest'}}"
></lit-route>
```

Check a more comprehensive example in https://github.com/fernandopasik/lit-redux-router/blob/master/demo/

## Development

Start server with example and watch mode for building the library

```
yarn start
```

Run lint and test tasks

```
yarn test
yarn lint
```

Build the library

```
yarn build
```

Check the full size of the library

```
yarn size
```

## Built with

* [regexparam](https://github.com/lukeed/regexparam) - A tiny (299B) utility that converts route patterns into RegExp
* [lit-html](https://github.com/Polymer/lit-html) - HTML template literals in JavaScript
* [lit-element](https://github.com/Polymer/lit-element) - An ultra-light custom element base class with a simple but expressive API
* [pwa-helpers](https://github.com/Polymer/pwa-helpers) - Small helper methods or mixins to help you build web apps
* [Redux](https://redux.js.org/) - Predictable state container for JavaScript apps

## License

MIT (c) 2018 [Fernando Pasik](https://fernandopasik.com)
