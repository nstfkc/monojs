import { test, expect } from "bun:test";
import { screen } from "@testing-library/dom";

import { Main } from "./index";
import { Root } from "./Root";
import { List } from "./List";
import { Text } from "./Text";
import { View } from "./View";

test("List renders items", () => {
  function App() {
    const items = ["Item 1", "Item 2", "Item 3"];

    Root(
      View(
        //
        List(items).item((item) => Text(item))
      )
    );
  }
  Main.render(App);

  expect(document.body.innerHTML).toEqual(
    "<div><span>Item 1</span><span>Item 2</span><span>Item 3</span></div>"
  );
});

test("List with empty array", () => {
  function App() {
    const items: string[] = [];

    Root(
      View(
        //
        List(items).item((item) => Text(item))
      )
    );
  }
  Main.render(App);

  expect(document.body.innerHTML).toEqual("<div></div>");
});

test("List with complex items", () => {
  function App() {
    const items = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    Root(
      View(
        //
        List(items).item((item) => View(Text(`${item.id}: ${item.name}`)))
      )
    );
  }
  Main.render(App);

  expect(document.body.innerHTML).toEqual(
    "<div><div><span>1: Alice</span></div><div><span>2: Bob</span></div></div>"
  );
});
