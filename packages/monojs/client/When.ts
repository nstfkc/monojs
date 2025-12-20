import { Component } from "./Component";
import { Context } from "./Context";
import type { Value } from "./types";
import { isState } from "./State";

export function When(condition: Value<boolean>) {
  return class When extends Component {
    protected thenComponent: typeof Component | null = null;
    protected elseComponent: typeof Component | null = null;

    static then(thenComponent: typeof Component) {
      return class extends this {
        protected override thenComponent = thenComponent;
      };
    }
    static else(elseComponent: typeof Component) {
      return class extends this {
        protected override elseComponent = elseComponent;
      };
    }

    protected override mount(pos: number[] = [0]) {
      // Evaluate condition - handle both State and raw boolean
      const conditionValue = isState(condition) ? condition.get() : condition;

      // Pass through parent's anchor function to children
      const anchorFn = Context.getAnchorFn(pos);
      Context.setAnchorFnDirect(pos, anchorFn);

      const childPos = Context.getNextCol(pos);
      if (conditionValue && this.thenComponent) {
        this.thenComponent.render(childPos);
      } else if (!conditionValue && this.elseComponent) {
        this.elseComponent.render(childPos);
      }
    }
  };
}
