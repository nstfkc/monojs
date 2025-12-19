function createContext() {
  let anchorElement: HTMLElement | null = null;
  let renderStore: Map<string, VoidFunction> = new Map();

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
    pushRender: (pos: number[], fn: VoidFunction) => {
      renderStore.set(pos.join(":"), fn);
    },
    getRenderStore: () => renderStore,
  };
}

export const Context = createContext();
