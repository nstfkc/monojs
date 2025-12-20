import { MonoElement } from "./MonoElement";
import { Context } from "./Context";

export function Text(children: string) {
  return class extends MonoElement {
    override tagName = "span";

    protected override mount(pos: number[]) {
      const el = document.createElement(this.tagName);
      for (const [key, value] of Object.entries(this.styles)) {
        el.style.setProperty(key, value);
      }

      el.appendChild(document.createTextNode(children));

      const fn = Context.getAnchorFn(pos);
      fn(el);
    }
  };
}
