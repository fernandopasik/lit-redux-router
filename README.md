# lit-redux-router

[![npm version][img-npm]][url-npm]
[![Build Status][img-circleci]][url-circleci]

[img-npm]: https://img.shields.io/npm/v/lit-redux-router.svg
[img-circleci]: https://circleci.com/gh/fernandopasik/lit-redux-router.svg?style=svg

[url-npm]: https://www.npmjs.com/package/lit-redux-router "npm version"
[url-circleci]: https://circleci.com/gh/fernandopasik/lit-redux-router "Build Status"

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
