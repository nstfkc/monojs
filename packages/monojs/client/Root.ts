import { Component } from "./Component";
import { Context } from "./Context";

export function Root(...children: (typeof Component)[]) {
  class RootComponent extends Component {
    protected mount(pos: number[] = [0]) {
      // Set up anchor function for Root's children to append to document.body
      Context.setAnchorFn(pos, document.body);

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
