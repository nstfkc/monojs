function createContext() {
  let anchorElement: HTMLElement | null = null;
  let render: Map<string, VoidFunction> = new Map();
  let letters = "abcdefghijklmnopqrstuvwxyz";
  let row = 0;
  let col = 0;

  return {
    setAnchorElement: (element: HTMLElement | null) => {
      anchorElement = element;
    },
    getAnchorElement: () => anchorElement,
    setRender: (id: string, fn: VoidFunction) => {
      render.set(id, fn);
    },
    getRenders: () => render,
    getRenderId: () => {
      const id = `r-${letters[col]}:${row}`;
      col++;
      if (col >= letters.length) {
        col = 0;
        row++;
      }
      return id;
    },
  };
}

export const Context = createContext();
