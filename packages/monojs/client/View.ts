import { MonoElement } from "./MonoElement";
import { Context } from "./Context";

export function View(...children: (typeof MonoElement)[]) {
  return class extends MonoElement {
    override tagName = "div";
    override children = children;

    protected override mount(pos: number[] = [0]) {
      const el = document.createElement(this.tagName);
      Context.setAnchorFn(pos, el);

      for (const [key, value] of Object.entries(this.styles)) {
        el.style.setProperty(key, value);
      }

      const fn = Context.getAnchorFn(pos);
      fn?.(el);

      let _pos = Context.getNextCol(pos);
      for (const Child of this.children) {
        _pos = Context.getNextRow(_pos);
        Child.render(_pos);
      }
    }
  };
}
