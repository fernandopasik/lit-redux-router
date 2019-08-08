import { LitElement, html, TemplateResult } from 'lit-element';
import './code-example';

class RenderContent extends LitElement {
  public render(): TemplateResult {
    return html`
      <style>
        @import url(https://unpkg.com/@material/typography/dist/mdc.typography.min.css);
      </style>
      <h2 class="mdc-typography--headline4">Render content for a route</h2>

      <p>
        The <code>lit-route</code> component renders when the <code>path</code> attribute matches
        with the current browser url. If the route path does not match <b>nothing</b> gets rendered.
        For rendering content there are two options: with children elements appended to the
        <code>lit-route</code> element or with the component name in a
        <code>component</code> attribute.
      </p>

      <h3 id="with-children-elements" class="mdc-typography--headline5">With children elements</h3>

      <p>
        Just insert children elements inside the <code>lit-route</code> element and that's what will
        be rendered when matching the route path.
      </p>

      <pre><code-example>
        class MyApp extends LitElement {
          render() {
            return html&#96;
              <div class="app-content">
                <lit-route path="/"><h1>Home</h1></lit-route>
                <lit-route path="/about"><h1>About</h1></lit-route>
              </div>
            &#96;;
          }
        } customElements.define('my-app', MyApp);
      </code-example></pre>

      <h3 id="with-a-component" class="mdc-typography--headline5">With a component</h3>

      <p>
        Add a <code>component</code> attribute with the name of the element that holds the content
        that you want to render in the matching route path. (If needed import first the component
        file)
      </p>

      <pre><code-example>
        class AppHome extends LitElement {
          render() {
            return html&#96;
              <h1>Home</h1>
            &#96;;
          }
        }
        customElements.define('app-home', AppHome);

        class AppAbout extends LitElement {
          render() {
            return html&#96;
              <h1>About</h1>
            &#96;;
          }
        }
        customElements.define('app-about', AppAbout);

        class MyApp extends LitElement {
          render() {
            return html&#96;
              <div class="app-content">
                <lit-route path="/" component="app-home"></lit-route>
                <lit-route path="/about" component="app-about"></lit-route>
              </div>
            &#96;;
          }
        }
        customElements.define('my-app', MyApp);
      </code-example></pre>
    `;
  }
}

customElements.define('app-render-content', RenderContent);
