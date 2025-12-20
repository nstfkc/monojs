function createContext() {
  let renderStore: Map<string, VoidFunction> = new Map();
  let anchorFns: Map<string, (el: HTMLElement) => void> = new Map();
  let registeredElements: Set<any> = new Set();
  let consumedElements: Set<any> = new Set();
  let pendingElements: any[] = [];
  const defaultAnchorFn = (el: HTMLElement) => {
    const textNode = document.createTextNode("");
    textNode.before(el);
    document.body.append(textNode);
  };

  // Helper: Get unconsumed pending elements
  const getUnconsumed = () => pendingElements.filter(el => !consumedElements.has(el));

  // Helper: Reset registration tracking
  const resetRegistrations = () => {
    registeredElements = new Set();
    consumedElements = new Set();
    pendingElements = [];
  };

  return {
    getNextCol: (pos: number[]) => {
      return [...pos, 0];
    },
    getNextRow: (pos: number[]) => {
      const next = [...pos];
      next[next.length - 1] = (pos[pos.length - 1] ?? 0) + 1;
      return next;
    },
    pushRender: (pos: number[], fn: VoidFunction) => {
      renderStore.set(pos.join(":"), fn);
    },
    getRenderStore: () => renderStore,
    reset: () => {
      renderStore = new Map();
      anchorFns = new Map();
      resetRegistrations();
    },
    pushElement: (el: any) => {
      registeredElements.add(el);
      pendingElements.push(el);
    },
    markConsumed: (el: any) => {
      consumedElements.add(el);
    },
    getTopLevelElements: (): any[] => {
      return Array.from(registeredElements).filter(el => !consumedElements.has(el));
    },
    resetComponent: resetRegistrations,
    getPendingElements: () => getUnconsumed(),
    consumePending: (count: number): any[] => {
      const pending = getUnconsumed();
      const consumed = pending.slice(0, count);
      consumed.forEach(el => consumedElements.add(el));
      return consumed;
    },
    replacePending: (oldEl: any, newEl: any) => {
      const index = pendingElements.indexOf(oldEl);
      if (index !== -1) {
        pendingElements[index] = newEl;
      }
      if (registeredElements.has(oldEl)) {
        registeredElements.delete(oldEl);
        registeredElements.add(newEl);
      }
    },
    getAnchorFn: (pos: Number[]) => {
      if (pos.length === 0) return defaultAnchorFn;
      const parentPos = pos.slice(0, -1);
      return anchorFns.get(parentPos.join(":")) ?? defaultAnchorFn;
    },
    setAnchorFn: (pos: Number[], parent: HTMLElement) => {
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
