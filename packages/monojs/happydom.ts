import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { beforeEach } from "bun:test";
import { Context } from "./client/Context";

GlobalRegistrator.register();

beforeEach(() => {
  document.body.innerHTML = "";
  document.head.innerHTML = "";
  Context.reset();
});
