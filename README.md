# Lit Redux Router

[![Gzip Bundle Size][badge-size]][url-size]
[![Build Status][badge-ci]][url-ci]
[![Test Coverage Status][badge-cov]][url-cov]
[![Known Vulnerabilities][badge-sec]][url-sec]

[![All Contributors][badge-contributors]](#contributors-)
[![npm version][badge-version]][url-version]
[![npm downloads][badge-downloads]][url-downloads]
[![Published on webcomponents.org][badge-wc]][url-wc]

[badge-size]: http://img.badgesize.io/https://unpkg.com/lit-redux-router/lit-redux-router.min.js?compression=gzip
[badge-ci]: https://circleci.com/gh/fernandopasik/lit-redux-router.svg?style=svg
[badge-cov]: https://codecov.io/gh/fernandopasik/lit-redux-router/branch/master/graph/badge.svg
[badge-sec]: https://snyk.io/test/github/fernandopasik/lit-redux-router/badge.svg?targetFile=package.json
[badge-contributors]: https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square
[badge-version]: https://img.shields.io/npm/v/lit-redux-router.svg
[badge-downloads]: https://img.shields.io/npm/dm/lit-redux-router.svg
[badge-wc]: https://img.shields.io/badge/webcomponents.org-published-blue.svg
[url-size]: https://unpkg.com/lit-redux-router/lit-redux-router.min.js 'Gzip Bundle Size'
[url-wc]: https://webcomponents.org/element/lit-redux-router 'Webcomponents url'
[url-ci]: https://circleci.com/gh/fernandopasik/lit-redux-router 'Build Status'
[url-cov]: https://codecov.io/gh/fernandopasik/lit-redux-router 'Coverage Status'
[url-sec]: https://snyk.io/test/github/fernandopasik/lit-redux-router?targetFile=package.json 'Known Vulnerabilities'
[url-version]: https://www.npmjs.com/package/lit-redux-router 'npm version'
[url-downloads]: https://www.npmjs.com/package/lit-redux-router 'npm downloads'

Declarative way of routing for [lit-html](https://github.com/Polymer/lit-html) powered by [pwa-helpers](https://github.com/Polymer/pwa-helpers), [redux](https://redux.js.org/) and [lit-element](https://github.com/Polymer/lit-element).

A minimal router solution (~1.6 kb Gzipped) that consist in using `lit-route` elements and **connecting** them to the store.

The routing approach is based on the [PWA Starter Kit](https://github.com/polymer/pwa-starter-kit).

## Install

Install this library and its peer dependencies

```
yarn add lit-redux-router
yarn add lit-html lit-element pwa-helpers redux
```

## Usage

Firstly ensure that the redux store has been created with the `lazyReducerEnhancer`, which allows for reducers to be installed lazily after initial store setup.

```js
import { createStore, compose, combineReducers } from 'redux';
import { reducer } from './reducer';
import { lazyReducerEnhancer } from 'pwa-helpers';

export const store = createStore(
  reducer,
  compose(lazyReducerEnhancer(combineReducers))
);
```

Then the router needs to **connect to a redux store**.

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
    return html`
      <h1>Home</h1>
    `;
  }
}
customElements.define('app-home', AppHome);

class AppAbout extends LitElement {
  render() {
    return html`
      <h1>About</h1>
    `;
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
    return html`
      <h1>Product with id: ${this.id}</h1>
    `;
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
<lit-route path="/whatever" component="my-whatever" scrollDisable></lit-route>
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

- [regexparam](https://github.com/lukeed/regexparam) - A tiny utility that converts route patterns into RegExp
- [lit-html](https://github.com/Polymer/lit-html) - HTML template literals in JavaScript
- [lit-element](https://github.com/Polymer/lit-element) - An ultra-light custom element base class with a simple but expressive API
- [pwa-helpers](https://github.com/Polymer/pwa-helpers) - Small helper methods or mixins to help you build web apps
- [Redux](https://redux.js.org/) - Predictable state container for JavaScript apps

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://fernandopasik.com"><img src="https://avatars1.githubusercontent.com/u/1301335?v=4" width="100px;" alt="Fernando Pasik"/><br /><sub><b>Fernando Pasik</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3Afernandopasik" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=fernandopasik" title="Code">💻</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=fernandopasik" title="Documentation">📖</a> <a href="#ideas-fernandopasik" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/hutchgrant"><img src="https://avatars3.githubusercontent.com/u/1429612?v=4" width="100px;" alt="Grant Hutchinson"/><br /><sub><b>Grant Hutchinson</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3Ahutchgrant" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=hutchgrant" title="Code">💻</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=hutchgrant" title="Documentation">📖</a> <a href="#ideas-hutchgrant" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/anoblet"><img src="https://avatars0.githubusercontent.com/u/7674171?v=4" width="100px;" alt="Andrew Noblet"/><br /><sub><b>Andrew Noblet</b></sub></a><br /><a href="https://github.com/fernandopasik/lit-redux-router/issues?q=author%3Aanoblet" title="Bug reports">🐛</a> <a href="https://github.com/fernandopasik/lit-redux-router/commits?author=anoblet" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT (c) 2018 [Fernando Pasik](https://fernandopasik.com)
