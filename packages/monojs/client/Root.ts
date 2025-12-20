import { MonoElement } from "./MonoElement";
import { Context } from "./Context";
import type { ChildNode } from "./types";

export function Root(...children: ChildNode[]) {
  class RootComponent extends MonoElement {
    protected override mount(pos: number[] = [0]) {
      // Set up anchor function for Root's direct children
      Context.setAnchorFnDirect(pos, (el: HTMLElement) => {
        document.body.appendChild(el);
      });

      let _pos = Context.getNextCol(pos);
      for (const Child of children) {
        if (typeof Child === "string") {
          console.log("string", Child);
          continue;
        }
        if (typeof Child === "number") {
          console.log("number", Child);
          continue;
        }
        if (typeof Child === "undefined") {
          console.log("undefined");
          continue;
        }
        if ("render" in Child) {
          console.log("MonoElement", Child);
          _pos = Context.getNextRow(_pos);
          Child.render(_pos);
          continue;
        }
      }
    }
  }
  RootComponent.render([0]);
  return RootComponent;
}
