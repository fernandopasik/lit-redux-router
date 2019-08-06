import { LitElement, html, property, css, CSSResult, TemplateResult } from 'lit-element';
// eslint-disable-next-line import/no-extraneous-dependencies
import Prism from 'prismjs';

class CodeExample extends LitElement {
  @property({ type: String })
  public language: string = 'javascript';

  public static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }

      code,
      pre {
        color: #ccc;
        background: none;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 1em;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
      }

      pre {
        padding: 1em;
        margin: 0.5em 0;
        overflow: auto;
      }

      :not(pre) > code,
      pre {
        background: #2d2d2d;
      }

      :not(pre) > code {
        padding: 0.1em;
        border-radius: 0.3em;
        white-space: normal;
      }

      ::slotted(.token.comment),
      ::slotted(.token.block-comment),
      ::slotted(.token.prolog),
      ::slotted(.token.doctype),
      ::slotted(.token.cdata) {
        color: #999;
      }

      ::slotted(.token.punctuation) {
        color: #ccc;
      }

      ::slotted(.token.tag),
      ::slotted(.token.attr-name),
      ::slotted(.token.namespace),
      ::slotted(.token.deleted) {
        color: #e2777a;
      }

      ::slotted(.token.function-name) {
        color: #6196cc;
      }

      ::slotted(.token.boolean),
      ::slotted(.token.number),
      ::slotted(.token.function) {
        color: #f08d49;
      }

      ::slotted(.token.property),
      ::slotted(.token.class-name),
      ::slotted(.token.constant),
      ::slotted(.token.symbol) {
        color: #f8c555;
      }

      ::slotted(.token.selector),
      ::slotted(.token.important),
      ::slotted(.token.atrule),
      ::slotted(.token.keyword),
      ::slotted(.token.builtin) {
        color: #cc99cd;
      }

      ::slotted(.token.string),
      ::slotted(.token.char),
      ::slotted(.token.attr-value),
      ::slotted(.token.regex),
      ::slotted(.token.variable) {
        color: #7ec699;
      }

      ::slotted(.token.operator),
      ::slotted(.token.entity),
      ::slotted(.token.url) {
        color: #67cdcc;
      }

      ::slotted(.token.important),
      ::slotted(.token.bold) {
        font-weight: bold;
      }
      ::slotted(.token.italic) {
        font-style: italic;
      }

      ::slotted(.token.entity) {
        cursor: help;
      }

      ::slotted(.token.inserted) {
        color: green;
      }
    `;
  }

  private getTabSpace = (line: string): string => {
    const match = line.match(/^\s*/);

    if (!match) {
      return '';
    }

    const [tabSpace] = match;

    return tabSpace;
  };

  private getLineFromChild = (child: Element): string => {
    if (child.nodeType === Node.TEXT_NODE) {
      return child.nodeValue;
    }

    return child.outerHTML;
  };

  private parseCode = (children: Element[] = []): string => {
    const [firstChild] = children;
    const tabSpace = this.getTabSpace(this.getLineFromChild(firstChild));
    const code = children.map(
      (child: Element): string => {
        const line = this.getLineFromChild(child).replace(
          new RegExp(`${tabSpace}`, 'gm'),
          tabSpace[0],
        );

        return line;
      },
    );

    return code.join('').trim();
  };

  public updated(): void {
    const slot = this.shadowRoot.querySelector('slot');
    const children = slot.assignedNodes();

    const code = this.parseCode(children as Element[]);
    let example = code;

    if (Prism.languages[this.language]) {
      example = Prism.highlight(code, Prism.languages[this.language], this.language);
    }

    this.innerHTML = example;
  }

  public render(): TemplateResult {
    return html`<pre><code class="language-${this.language}"><slot></slot></code></pre>`;
  }
}

customElements.define('code-example', CodeExample);
