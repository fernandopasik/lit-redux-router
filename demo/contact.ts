import type { TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { navigate } from '../src/lit-redux-router.js';
import store from './store.js';

class MyContact extends LitElement {
  @property({ type: String })
  protected name = '';

  @property({ type: String })
  protected email = '';

  public save(prop: 'email' | 'name'): (event: Event) => void {
    return (event: Event): void => {
      this[prop] = (event.target as HTMLInputElement).value;
    };
  }

  public submit(): void {
    const query: string[] = [];
    let queryString = '';

    if (this.name) {
      query.push(`name=${this.name}`);
    }

    if (this.email) {
      query.push(`email=${this.email}`);
    }

    if (query.length) {
      queryString = `?${query.join('&')}`;
    }

    store.dispatch(navigate(`/contact${queryString}`));
  }

  public render(): TemplateResult {
    return html`
      <h1>Contact</h1>
      <p>
        <label for="name">name</label>
        <input id="name" name="name" .value=${this.name} @input=${this.save('name')} />
      </p>
      <p>
        <label for="email">email</label>
        <input id="email" name="email" .value=${this.email} @input=${this.save('email')} />
      </p>
      <button @click=${this.submit}>submit</button>
    `;
  }
}

customElements.define('my-contact', MyContact);
