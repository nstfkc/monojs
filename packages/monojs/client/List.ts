import { Component } from "./Component";
import { Context } from "./Context";

export function List<T>(items: T[]) {
  return class List extends Component {
    protected renderFn: ((item: T) => typeof Component) | null = null;

    static item(renderFn: (item: T) => typeof Component) {
      return class extends this {
        protected renderFn = renderFn;
      };
    }

    protected mount(pos: number[] = [0]) {
      const parentAnchor = Context.getAnchorForPosition(pos);
      Context.setAnchorForChildren(pos, parentAnchor);

      if (!this.renderFn) return;

      let _pos = Context.getNextCol(pos);
      for (const item of items) {
        _pos = Context.getNextRow(_pos);
        const ItemComponent = this.renderFn(item);
        ItemComponent.render(_pos);
      }
    }
  };
}
