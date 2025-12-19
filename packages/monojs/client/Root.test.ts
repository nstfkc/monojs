import { test, expect } from "bun:test";
import { screen } from "@testing-library/dom";

import { Root } from "./index";
import { Text } from "./Text";

test("root render", () => {
  function App() {
    Text("Hello from Root").style({ color: "red" });
  }
  Root.render(App);
  screen.debug();

  expect(document.body.innerHTML).toEqual(
    '<span style="color: red;">Hello from Root</span>'
  );
});
