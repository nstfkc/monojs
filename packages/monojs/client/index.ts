export function Text(...children: (string | number)[]) {
  //
}

type VoidFunction = () => void;

type Component<T extends any = any> =
  | VoidFunction
  | ((...props: T[]) => undefined | VoidFunction);

export class Root {
  static render(component: Component) {
    document.body.innerHTML = "Hello from Root";
  }
}
