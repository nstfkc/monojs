import { expect, test } from "bun:test";
import { render } from "../testing/render";
import { View } from "./View";
import { Text } from "./Text";

test("Render component", () => {
  const App = () => {
    View(Text("HI"), View(Text("BYE")));
    View(Text("Out"));
  };
  render(App());
  expect(document.body.innerHTML).toBe(
    "<div><span>HI</span><div><span>BYE</span></div></div><div><span>Out</span></div>"
  );
});

test("Render nested components", () => {
  const Message = () => {
    View(Text("Nested Message"));
  };
  const App = () => {
    View(Text("Start"));
    Message();
  };
  render(App());
  expect(document.body.innerHTML).toBe(
    "<div><span>Start</span></div><div><span>Nested Message</span></div>"
  );
});

test("Render component as children", () => {
  const Message = () => {
    View(Text("Nested Message"));
  };
  const App = () => {
    View(Text("Start"), Message());
  };
  render(App());
  expect(document.body.innerHTML).toBe(
    "<div><span>Start</span><div><span>Nested Message</span></div></div>"
  );
});
