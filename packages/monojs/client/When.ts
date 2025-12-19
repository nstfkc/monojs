import { Component } from "./Component";
import { Context } from "./Context";

export function When(condition: boolean) {
  return class When extends Component {
    protected thenComponent: typeof Component | null = null;
    protected elseComponent: typeof Component | null = null;

    static then(thenComponent: typeof Component) {
      return class extends this {
        protected thenComponent = thenComponent;
      };
    }
    static else(elseComponent: typeof Component) {
      return class extends this {
        protected elseComponent = elseComponent;
      };
    }

    protected mount(pos: number[] = [0]) {
      const parentAnchor = Context.getAnchorForPosition(pos);
      Context.setAnchorForChildren(pos, parentAnchor);

      const childPos = Context.getNextCol(pos);
      if (condition && this.thenComponent) {
        this.thenComponent.render(childPos);
      } else if (!condition && this.elseComponent) {
        this.elseComponent.render(childPos);
      }
    }
  };
}
