import { MonoElement } from "./MonoElement";
import { Context } from "./Context";

// Helper: Mark child as consumed, checking prototype chain for pending elements
const markChildConsumed = (child: typeof MonoElement, pending: any[]) => {
  for (let current = child; current; current = Object.getPrototypeOf(current)) {
    if (pending.includes(current)) {
      Context.markConsumed(current);
      return;
    }
  }
  Context.markConsumed(child);
};

export function View(...children: (typeof MonoElement)[]) {
  // Separate explicit children from undefined (component functions)
  const pendingElements = Context.getPendingElements();
  const explicitChildren = children.filter(c => c !== undefined);
  const undefinedCount = children.length - explicitChildren.length;

  // Mark explicit children as consumed (handles .style() prototype chain)
  explicitChildren.forEach(c => markChildConsumed(c, pendingElements));

  // Fill undefined slots with pending elements
  const fillElements = undefinedCount > 0 ? Context.consumePending(undefinedCount) : [];
  let fillIndex = 0;

  // Build actual children array
  const actualChildren = children
    .map(c => c === undefined ? fillElements[fillIndex++] : c)
    .filter(Boolean) as (typeof MonoElement)[];

  const ViewClass = class extends MonoElement {
    override tagName = "div";
    override children = actualChildren;

    protected override mount(pos: number[] = [0]) {
      const el = document.createElement(this.tagName);
      Context.setAnchorFn(pos, el);
      this.applyStyles(el);

      const fn = Context.getAnchorFn(pos);
      fn?.(el);

      let _pos = Context.getNextCol(pos);
      for (const Child of this.children) {
        _pos = Context.getNextRow(_pos);
        Child.render(_pos);
      }
    }
  };

  Context.pushElement(ViewClass);
  // Note: explicit children were already marked as consumed at the start
  // fillElements were marked as consumed by consumePending()

  return ViewClass;
}
