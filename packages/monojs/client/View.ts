import { MonoElement } from "./MonoElement";
import { Context } from "./Context";

export function View(...children: (typeof MonoElement)[]) {
  // Build a list of explicit children and count undefined
  const explicitChildren: (typeof MonoElement)[] = [];
  let undefinedCount = 0;

  for (const child of children) {
    if (child === undefined) {
      undefinedCount++;
    } else {
      explicitChildren.push(child);
    }
  }

  // For explicit children, consume from pending if they (or their prototype) are there
  // This handles cases like Text().style() where style() creates a new class extending Text
  const getPendingElements = Context.getPendingElements();
  for (const child of explicitChildren) {
    // Check if this child or any of its prototypes are in pending
    let current = child;
    let found = false;
    while (current && !found) {
      if (getPendingElements.includes(current)) {
        Context.markConsumed(current);
        found = true;
      }
      current = Object.getPrototypeOf(current);
    }
    // If not found in pending, still mark as consumed
    if (!found) {
      Context.markConsumed(child);
    }
  }

  // Consume pending elements to fill undefined slots
  const fillElements = undefinedCount > 0
    ? Context.consumePending(undefinedCount)
    : [];

  // Build actual children, replacing undefined with consumed pending
  const actualChildren: (typeof MonoElement)[] = [];
  let fillIndex = 0;

  for (const child of children) {
    if (child === undefined) {
      // Component function - use consumed pending element
      if (fillIndex < fillElements.length) {
        actualChildren.push(fillElements[fillIndex]);
        fillIndex++;
      }
      // If no pending element available, skip
    } else {
      // Normal child - keep as is
      actualChildren.push(child);
    }
  }

  const ViewClass = class extends MonoElement {
    override tagName = "div";
    override children = actualChildren;

    protected override mount(pos: number[] = [0]) {
      const el = document.createElement(this.tagName);
      Context.setAnchorFn(pos, el);

      for (const [key, value] of Object.entries(this.styles)) {
        el.style.setProperty(key, value);
      }

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
