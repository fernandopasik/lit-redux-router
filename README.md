# Lit-redux-router

Declarative way of routing for lit-html powered by pwa-helpers, redux and lit-element

## Install

```
yarn add lit-redux-router lit-html @polymer/lit-element pwa-helpers redux
```

## Minimal Example

```
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
