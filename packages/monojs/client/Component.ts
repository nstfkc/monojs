import { Context } from "./Context";

export class Component {
  tagName: string = "div";
  children: (new () => Component)[] = [];
  styles: Record<string, any> = {};

  constructor() {}

  protected mount(_pos: number[]) {}

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
      styles = styles;
    };
  }
}
