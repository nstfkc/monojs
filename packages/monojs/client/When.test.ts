import { test, expect } from "bun:test";
import { screen } from "@testing-library/dom";

import { Main } from "./index";
import { Root } from "./Root";
import { When } from "./When";
import { Text } from "./Text";
import { View } from "./View";

test("Simple When", () => {
  function App() {
    Root(
      //
      View(
        //
        When(true)
          //
          .then(Text("Red"))
          .else(Text("Blue"))
      )
    );
  }
  Main.render(App);

  expect(document.body.innerHTML).toEqual("<div><span>Red</span></div>");
});
