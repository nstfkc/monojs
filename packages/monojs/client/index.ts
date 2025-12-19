import { Component } from "./Component";
import { Context } from "./Context";

export class Root {
  static render(App: typeof Component) {
    Context.setAnchorElement(document.body);
    App.render([0]);

    const processed = new Set<string>();
    const store = Context.getRenderStore();

    while (store.size > processed.size) {
      const entries = Array.from(store.entries())
        .filter(([key]) => !processed.has(key))
        .sort(([a], [b]) => a.localeCompare(b));

      for (const [key, fn] of entries) {
        fn();
        processed.add(key);
      }
    }
  }
}
