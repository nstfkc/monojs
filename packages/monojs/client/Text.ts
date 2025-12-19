import { Context } from "./Context";

class Component {
  tagName: string = "span";
  static renderId: string;
  styles: Record<string, any> = {};

  constructor() {}

  mount() {}

  static render(this: typeof Component) {
    Context.setRender(this.renderId, () => {
      const instance = new this();
      instance.mount();
      this.render();
    });
  }

  static style(this: typeof Component, styles: Record<string, any>) {
    const renderId = this.renderId;
    class ComponentWithStyles extends this {
      constructor(..._args: any[]) {
        super();
      }
      static renderId = renderId;
      styles = styles;
    }
    ComponentWithStyles.render();
    return ComponentWithStyles;
  }
}

export function Text(children: string) {
  class TextComponent extends Component {
    static renderId = Context.getRenderId();
    mount() {
      const el = document.createElement(this.tagName);
      for (const [key, value] of Object.entries(this.styles)) {
        el.style.setProperty(key, value);
      }
      el.appendChild(document.createTextNode(children));
      Context.getAnchorElement()?.appendChild(el);
    }
  }
  TextComponent.render();
  return TextComponent;
}
