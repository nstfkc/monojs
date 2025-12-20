export class State<T> {
  static __brand__ = "State";
  private value: T;
  private listeners: Set<(value: T) => void> = new Set();

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  set(newValue: T): void {
    this.value = newValue;
    for (const listener of this.listeners) {
      listener(newValue);
    }
  }

  subscribe(listener: (value: T) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  static boolean(initialValue: boolean): State<boolean> {
    return new BooleanState(initialValue);
  }

  static number(initialValue: number): State<number> {
    return new NumberState(initialValue);
  }

  static string(initialValue: string): State<string> {
    return new StringState(initialValue);
  }
}

class BooleanState extends State<boolean> {
  toggle() {
    this.set(!this.get());
  }
}

class NumberState extends State<number> {
  increment(by = 1) {
    this.set(this.get() + by);
  }

  decrement(by = 1) {
    this.set(this.get() - by);
  }
}

class StringState extends State<string> {
  append(suffix: string) {
    this.set(this.get() + suffix);
  }

  prepend(prefix: string) {
    this.set(prefix + this.get());
  }
}

export function isState<T>(obj: any): obj is State<T> {
  return obj && obj.constructor && obj.constructor.__brand__ === "State";
}
