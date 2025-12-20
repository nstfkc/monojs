import { Component } from "./Component";
import { Context } from "./Context";

export function Root(...children: (typeof Component)[]) {
  class RootComponent extends Component {
    protected override mount(pos: number[] = [0]) {
      document.body.childNodes.forEach((node) => {
        document.body.removeChild(node);
      });

      // Set up anchor function for Root's direct children
      Context.setAnchorFnDirect(pos, (el: HTMLElement) => {
        document.body.appendChild(el);
      });

      let _pos = Context.getNextCol(pos);
      for (const Child of children) {
        _pos = Context.getNextRow(_pos);
        Child.render(_pos);
      }
    }
  }
  RootComponent.render([0]);
  return RootComponent;
}
