import { Context } from "./Context";

type Component<T extends any = any> =
  | VoidFunction
  | ((...props: T[]) => undefined | VoidFunction);

export class Root {
  static render(Component: Component) {
    Context.setAnchorElement(document.body);
    Component();
    for (const fn of Array.from(Context.getRenders().values())) {
      fn();
    }
  }
}
