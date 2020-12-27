import type { TemplateResult } from 'lit-element';
import { html, LitElement, property } from 'lit-element';
import { navigate } from '../src/lit-redux-router';
import store from './store';

class MyContact extends LitElement {
  @property({ type: String })
  protected name = '';

  @property({ type: String })
  protected email = '';

  public save(prop: 'name' | 'email'): (event: Readonly<Event>) => void {
    return (event: Readonly<Event>): void => {
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
        <input id="name" name="name" .value=${this.name} @input="${this.save('name')}" />
      </p>
      <p>
        <label for="email">email</label>
        <input id="email" name="email" .value=${this.email} @input="${this.save('email')}" />
      </p>
      <button @click="${this.submit}">submit</button>
    `;
  }
}

customElements.define('my-contact', MyContact);
