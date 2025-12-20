import { Context } from "./Context";

type EventName = keyof GlobalEventHandlersEventMap;

export class Component {
  tagName: string = "div";
  children: Array<(new () => Component) | string> = [];
  styles: Record<string, any> = {};
  protected cleanupFnList = new Set<VoidFunction>();

  constructor() {}

  protected mount(_pos: number[]) {}

  protected addEventListeners(element: HTMLElement) {
    for (const propertyName in this) {
      if (propertyName.startsWith("__event_handler_")) {
        const value = this[propertyName] as string;
        if (value === "") return;
        const key = propertyName.replace("__event_handler_", "");
        element.addEventListener(key, value as any);
        this.cleanupFnList.add(() =>
          element.removeEventListener(key, value as any)
        );
      }
    }
  }

  static render(this: typeof Component, pos: number[] = [0]) {
    Context.pushRender(pos, () => {
      const instance = new this();
      instance.mount(pos);
    });
  }

  static style(this: typeof Component, styles: Record<string, any>) {
    return class extends this {
      constructor(..._args: any[]) {
        super();
      }
      override styles = styles;
    };
  }

  static on<E extends EventName>(
    this: new () => Component,
    event: E,
    handler: (e: GlobalEventHandlersEventMap[E]) => void
  ) {
    this.prototype[`__event_handler_${event}`] = handler;
    return this as typeof Component;
  }
}
