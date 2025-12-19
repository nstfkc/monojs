import { test, expect } from "bun:test";
import { screen } from "@testing-library/dom";

import { Root } from "./index";
import { Text } from "./Text";
import { View } from "./View";

test("root render", () => {
  function main() {
    Root.render(
      View(
        //
        Text("Red"),
        Text("Blue")
      ).style({
        backgroundColor: "white",
      })
    );
  }
  main();
  screen.debug();

  expect(document.body.innerHTML).toEqual(
    '<div style="backgroundColor: white;"><span>Red</span><span>Blue</span></div>'
  );
});
