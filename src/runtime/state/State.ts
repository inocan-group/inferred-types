/* eslint-disable no-use-before-define */
import {  Box, ExpandRecursively,  Narrowable } from "src/types";
import { omit } from "../dictionary";
import { box, expandRecursively } from "../literals";
import { isObject } from "../type-guards";

/**
 * type guard to detect a _state_ being managed by the `StateApi`
 */
export function isStateApi<T>(value: T): value is T & StateApi<any> {
  return isObject(value) && "kind" in value && value._kind === "StateObject";
}

type IsStateApi<T> = T extends Record<string, unknown>
  ? T["_kind"] extends "StateObject"
      ? true
      : false
  : never;

/**
 * API surface for managing a state created with the
 * `createState()` utility.
 */
export type StateApi<
  TState extends Narrowable,
> = {
  _kind: "StateObject";
  state: Box<TState>;
  /** add a KV pair to the state */
  add<K extends string, V extends Narrowable>(
    key: K, value: V
  ): StateApi<ExpandRecursively<TState & Record<K,V>>>;
  /** remove a key in the managed state */
  remove<K extends keyof TState>(key: K): StateApi<Omit<TState, K>>;
  /** return the internally managed state */
  done: () => ExpandRecursively<TState>;
};

/**
 * Provides a chainable API surface for managing
 * a state object.
 */
export type StateManager = <
  TState extends Record<string, V>,
  V extends Narrowable
>(state: TState) => StateApi<TState>;

  
/**
 * **createState**(initialState)
 * 
 * Manages a strongly typed state internally and allows
 * external users to build up state and then extract the
 * finished state object with a call to `done()`.
 */
export const createState: StateManager = (state) => 
createApi(state);

const createApi: StateManager = (state) => ({
  _kind: "StateObject",
  state: box(state),
  add(key, value) {
    
    return createState(expandRecursively({
      ...state,
      [key]: value
    }));
  },
  remove(key) {
    return createState(omit(state, key) as unknown as Omit<typeof state, typeof key>);
  },
  done: () => expandRecursively(state)
});


let x = createState({bar: 23});
x = x.add("color", "red");
x = x.add("age", 25);
const final = x.done();


const y = x.add("foo", 1).add("barry", 42);
const yb = y.add("another", "one");

const y2 = createState(y).add("fizz", "buzz").done();

