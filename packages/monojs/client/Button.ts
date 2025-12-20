import { Component } from "./Component";
import { Context } from "./Context";

export function Button(...children: (typeof Component | string)[]) {
  return class extends Component {
    override tagName = "button";
    override children = children;

    protected override mount(pos: number[]) {
      const el = document.createElement(this.tagName);
      for (const [key, value] of Object.entries(this.styles)) {
        (el.style as any)[key] = value;
      }

      let _pos = Context.getNextCol(pos);
      for (const Child of this.children) {
        if (typeof Child === "string") {
          const textNode = document.createTextNode(Child);
          el.appendChild(textNode);
          _pos = Context.getNextRow(_pos);
        } else {
          _pos = Context.getNextRow(_pos);
          Child.render(_pos);
        }
      }
      this.addEventListeners(el);
    }
  };
}
