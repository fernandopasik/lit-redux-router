# Lit Redux Router

[![Build Status][badge-1]][url-1]
[![Coverage Status][badge-2]][url-2]

[![npm version][badge-3]][url-3]
[![Dependency Status][badge-4]][url-4]
[![peerDependency Status][badge-5]][url-5]
[![devDependency Status][badge-6]][url-6]

[badge-1]: https://circleci.com/gh/fernandopasik/lit-redux-router.svg?style=svg
[badge-2]: https://codecov.io/gh/fernandopasik/lit-redux-router/branch/master/graph/badge.svg
[badge-3]: https://img.shields.io/npm/v/lit-redux-router.svg
[badge-4]: https://david-dm.org/fernandopasik/lit-redux-router/status.svg
[badge-5]: https://david-dm.org/fernandopasik/lit-redux-router/peer-status.svg
[badge-6]: https://david-dm.org/fernandopasik/lit-redux-router/dev-status.svg

[url-1]: https://circleci.com/gh/fernandopasik/lit-redux-router "Build Status"
[url-2]: https://codecov.io/gh/fernandopasik/lit-redux-router "Coverage Status"
[url-3]: https://www.npmjs.com/package/lit-redux-router "npm version"
[url-4]: https://david-dm.org/fernandopasik/lit-redux-router "Dependency Status"
[url-5]: https://david-dm.org/fernandopasik/lit-redux-router?type=peer "Peer Dependency Status"
[url-6]: https://david-dm.org/fernandopasik/lit-redux-router?type=dev "Dev Dependency Status"

Declarative way of routing for [lit-html](https://github.com/Polymer/lit-html) powered by [pwa-helpers](https://github.com/Polymer/pwa-helpers), [redux](https://redux.js.org/) and [lit-element](https://github.com/Polymer/lit-element).

A minimal router solution (~1.25 kb) based on the routing approach taken by [PWA Starter Kit](https://github.com/polymer/pwa-starter-kit).
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
