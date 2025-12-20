import { test, expect } from "bun:test";

import { Main } from "./index";
import { Root } from "./Root";
import { Text } from "./Text";
import { View } from "./View";
import { State } from "./State";
import { When } from "./When";

test("Button onClick", () => {
  function App() {
    const bool = State.boolean(false);
    Root(View(When(bool).then(Text("True")).else(Text("False"))));
  }
  Main.render(App);
});
