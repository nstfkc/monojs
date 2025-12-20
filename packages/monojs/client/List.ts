import { MonoElement } from "./MonoElement";
import { Context } from "./Context";

export function List<T>(items: T[]) {
  return class List extends MonoElement {
    protected renderFn: ((item: T) => typeof MonoElement) | null = null;

    static item(renderFn: (item: T) => typeof MonoElement) {
      return class extends this {
        protected override renderFn = renderFn;
      };
    }

    protected override mount(pos: number[] = [0]) {
      if (!this.renderFn) return;

      // Pass through parent's anchor function to children
      const anchorFn = Context.getAnchorFn(pos);
      Context.setAnchorFnDirect(pos, anchorFn);

      let _pos = Context.getNextCol(pos);
      for (const item of items) {
        _pos = Context.getNextRow(_pos);
        const ItemComponent = this.renderFn(item);
        ItemComponent.render(_pos);
      }
    }
  };
}
