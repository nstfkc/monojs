import { test, expect } from "bun:test";
import { screen } from "@testing-library/dom";

import { Main } from "./index";
import { Text } from "./Text";
import { View } from "./View";
import { Root } from "./Root";

test("root render", () => {
  function App() {
    Root(
      View(
        //
        Text("Red"),
        Text("Blue"),
        View(Text("Nested 1"), Text("Nested 2"))
      ).style({
        backgroundColor: "white",
      }),
      Text("Outside")
    );
  }
  Main.render(App);
  screen.debug();

  expect(document.body.innerHTML).toEqual(
    '<div style="backgroundColor: white;"><span>Red</span><span>Blue</span><div><span>Nested 1</span><span>Nested 2</span></div></div><span>Outside</span>'
  );
});
