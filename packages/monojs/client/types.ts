import type { State } from "./State";

export type Value<T> = State<T> | T;
