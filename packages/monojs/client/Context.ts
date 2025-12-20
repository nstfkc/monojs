function createContext() {
  let anchorElement: HTMLElement | null = null;
  let renderStore: Map<string, VoidFunction> = new Map();
  let anchorStore: Map<string, HTMLElement | null> = new Map();
  let anchorFns: Map<string, (el: HTMLElement) => void> = new Map();
  const defaultAnchorFn = (el: HTMLElement) => {
    const textNode = document.createTextNode("");
    textNode.before(el);
    document.body.append(textNode);
  };

  return {
    getNextCol: (pos: number[]) => {
      return [...pos, 0];
    },
    getNextRow: (pos: number[]) => {
      const last = pos[pos.length - 1] ?? 0;
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
      anchorFns = new Map();
    },
    getAnchorFn: (pos: Number[]) => {
      if (pos.length === 0) return defaultAnchorFn;
      const parentPos = pos.slice(0, -1);
      return anchorFns.get(parentPos.join(":")) ?? defaultAnchorFn;
    },
    setAnchorFn: (pos: Number[], parent: HTMLElement) => {
      if (!parent.parentElement) {
        document.body.append(parent);
      }
      anchorFns.set(pos.join(":"), (el: HTMLElement) => {
        const textNode = document.createTextNode("");
        parent.appendChild(textNode);
        textNode.before(el);
      });
    },
    setAnchorFnDirect: (pos: number[], fn: (el: HTMLElement) => void) => {
      anchorFns.set(pos.join(":"), fn);
    },
  };
}

export const Context = createContext();
