import { Context } from "./Context";

type EventName = keyof GlobalEventHandlersEventMap;

export class MonoElement {
  tagName: string = "div";
  children: Array<(new () => MonoElement) | string> = [];
  styles: Record<string, any> = {};
  protected cleanupFnList = new Set<VoidFunction>();

  constructor() {}

  protected mount(_pos: number[]) {}

  protected applyStyles(el: HTMLElement) {
    Object.entries(this.styles).forEach(([key, value]) =>
      el.style.setProperty(key, value)
    );
  }

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

  static render(this: typeof MonoElement, pos: number[] = [0]) {
    Context.pushRender(pos, () => {
      const instance = new this();
      instance.mount(pos);
    });
  }

  static style(this: typeof MonoElement, styles: Record<string, any>) {
    const StyledClass = class extends this {
      override styles = styles;
    };
    Context.replacePending(this, StyledClass);
    return StyledClass;
  }

  static on<E extends EventName>(
    this: new () => MonoElement,
    event: E,
    handler: (e: GlobalEventHandlersEventMap[E]) => void
  ) {
    this.prototype[`__event_handler_${event}`] = handler;
    return this as typeof MonoElement;
  }
}
