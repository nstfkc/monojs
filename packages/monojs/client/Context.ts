function createContext() {
  let anchorElement: HTMLElement | null = null;
  let renderStore: Map<string, VoidFunction> = new Map();
  let anchorStore: Map<string, HTMLElement | null> = new Map();

  return {
    getNextCol: (pos: number[]) => {
      return [...pos, 0];
    },
    getNextRow: (pos: number[]) => {
      const last = pos[pos.length - 1];
      const out = Object.assign([], pos) as number[];
      out[out.length - 1] = last + 1;
      return out;
    },
    setAnchorElement: (element: HTMLElement | null) => {
      anchorElement = element;
    },
    getAnchorElement: () => anchorElement,
    setAnchorForChildren: (pos: number[], element: HTMLElement | null) => {
      anchorStore.set(pos.join(":"), element);
    },
    getAnchorForPosition: (pos: number[]) => {
      if (pos.length === 0) return null;
      const parentPos = pos.slice(0, -1);
      return anchorStore.get(parentPos.join(":")) ?? null;
    },
    pushRender: (pos: number[], fn: VoidFunction) => {
      renderStore.set(pos.join(":"), fn);
    },
    getRenderStore: () => renderStore,
    reset: () => {
      anchorElement = null;
      renderStore = new Map();
      anchorStore = new Map();
    },
  };
}

export const Context = createContext();
