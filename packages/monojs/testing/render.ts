import { Main } from "../client";
import { Root } from "../client/Root";
import { Context } from "../client/Context";
import type { ChildNode } from "../client/types";

export function render(...children: ChildNode[]) {
  Main.render(() => {
    const topLevelElements = Context.getTopLevelElements();
    Context.resetComponent();
    Root(...topLevelElements);
  });
}
