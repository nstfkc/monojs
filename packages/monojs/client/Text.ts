import { MonoElement } from "./MonoElement";
import { Context } from "./Context";

export function Text(children: string) {
  const TextClass = class extends MonoElement {
    override tagName = "span";

    protected override mount(pos: number[]) {
      const el = document.createElement(this.tagName);
      this.applyStyles(el);
      el.appendChild(document.createTextNode(children));

      const fn = Context.getAnchorFn(pos);
      fn(el);
    }
  };

  Context.pushElement(TextClass);

  return TextClass;
}
