# Lit Redux Router

[![Build Status][badge-ci]][url-ci]
[![Coverage Status][badge-cov]][url-cov]

[![npm version][badge-version]][url-version]
[![Dependency Status][badge-deps]][url-deps]
[![peerDependency Status][badge-deps-peer]][url-deps-peer]
[![devDependency Status][badge-deps-dev]][url-deps-dev]

[badge-ci]: https://circleci.com/gh/fernandopasik/lit-redux-router.svg?style=svg
[badge-cov]: https://codecov.io/gh/fernandopasik/lit-redux-router/branch/master/graph/badge.svg
[badge-version]: https://img.shields.io/npm/v/lit-redux-router.svg
[badge-deps]: https://david-dm.org/fernandopasik/lit-redux-router/status.svg
[badge-deps-peer]: https://david-dm.org/fernandopasik/lit-redux-router/peer-status.svg
[badge-deps-dev]: https://david-dm.org/fernandopasik/lit-redux-router/dev-status.svg

[url-ci]: https://circleci.com/gh/fernandopasik/lit-redux-router "Build Status"
[url-cov]: https://codecov.io/gh/fernandopasik/lit-redux-router "Coverage Status"
[url-version]: https://www.npmjs.com/package/lit-redux-router "npm version"
[url-deps]: https://david-dm.org/fernandopasik/lit-redux-router "Dependency Status"
[url-deps-peer]: https://david-dm.org/fernandopasik/lit-redux-router?type=peer "Peer Dependency Status"
[url-deps-dev]: https://david-dm.org/fernandopasik/lit-redux-router?type=dev "Dev Dependency Status"

Declarative way of routing for [lit-html](https://github.com/Polymer/lit-html) powered by [pwa-helpers](https://github.com/Polymer/pwa-helpers), [redux](https://redux.js.org/) and [lit-element](https://github.com/Polymer/lit-element).

A minimal router solution (~1.25 kb Gzipped) based on the routing approach taken by [PWA Starter Kit](https://github.com/polymer/pwa-starter-kit).
More info here: https://polymer.github.io/pwa-starter-kit/configuring-and-personalizing/#routing

## Install

```
yarn add lit-redux-router lit-html @polymer/lit-element pwa-helpers redux
```

## Basic Example

```js
// app.js
import { LitElement, html } from '@polymer/lit-element';
import { connectRouter } from 'lit-redux-router';
import store from './store.js';

connectRouter(store);

export default class MyApp extends LitElement {
  render() {
    return html`
      <div class="app-bar">Example App</div>

      <div class="app-content">
        <lit-route path="/"><h1>Home</h1></lit-route>
        <lit-route path="/products/:id?/:name?" component="my-product"></lit-route>
      </div>
    `;
  }
}
```

Check a more complete example in https://github.com/fernandopasik/lit-redux-router/blob/master/example/app.js

## Development

```
yarn watch
yarn test
yarn lint
yarn build
```

## Built with

* [regexparam](https://github.com/lukeed/regexparam) - A tiny (299B) utility that converts route patterns into RegExp
* [lit-html](https://github.com/Polymer/lit-html) - HTML template literals in JavaScript
* [lit-element](https://github.com/Polymer/lit-element) - An ultra-light custom element base class with a simple but expressive API
* [pwa-helpers](https://github.com/Polymer/pwa-helpers) - Small helper methods or mixins to help you build web apps
* [Redux](https://redux.js.org/) - Predictable state container for JavaScript apps

## License

MIT (c) 2018 [Fernando Pasik](https://fernandopasik.com)
