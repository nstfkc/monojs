import { MonoElement } from "./MonoElement";
import { Context } from "./Context";
import type { Value } from "./types";
import { isState } from "./State";

export function When(condition: Value<boolean>) {
  return class extends MonoElement {
    protected thenComponent: typeof MonoElement | null = null;
    protected elseComponent: typeof MonoElement | null = null;
    static then(thenComponent: typeof MonoElement) {
      return class extends this {
        protected override thenComponent = thenComponent;
      };
    }
    static else(elseComponent: typeof MonoElement) {
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
