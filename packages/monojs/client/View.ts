import { Component } from "./Component";
import { Context } from "./Context";

export function View(...children: (typeof Component)[]) {
  return class extends Component {
    tagName = "div";
    children = children;
    protected mount(pos: number[] = [0]) {
      const el = document.createElement(this.tagName);
      for (const [key, value] of Object.entries(this.styles)) {
        el.style.setProperty(key, value);
      }

      Context.getAnchorForPosition(pos)?.appendChild(el);
      Context.setAnchorForChildren(pos, el);

      let _pos = Context.getNextCol(pos);
      for (const Child of this.children) {
        _pos = Context.getNextRow(_pos);
        Child.render(_pos);
      }
    }
  };
}
