import type { MonoElement } from "./MonoElement";
import type { State } from "./State";

export type Value<T> = State<T> | T;

export type ChildNode = typeof MonoElement | string | number;
