import { Component } from "./Component";
import { Context } from "./Context";

export function Text(children: string) {
  class TextComponent extends Component {
    tagName = "span";

    protected mount(pos: number[]) {
      const el = document.createElement(this.tagName);
      for (const [key, value] of Object.entries(this.styles)) {
        el.style.setProperty(key, value);
      }
      el.appendChild(document.createTextNode(children));

      const parentAnchor = Context.getAnchorForPosition(pos);
      parentAnchor?.appendChild(el);
    }
  }
  return TextComponent;
}
