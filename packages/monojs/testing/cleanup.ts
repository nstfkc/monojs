import { Context } from "../client/Context";

export function cleanup() {
  document.body.innerHTML = "";
  document.head.innerHTML = "";
  Context.reset();
}
