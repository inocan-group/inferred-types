import {  TypedFunction } from "../base-types";

/**
 * **HandleDoneFn**`<T>`
 * 
 * A type utility which looks for a `done` property on `T` and
 * if it's a function it will convert the type to the _return type_
 * of the `done()` function.
 */
export type HandleDoneFn<T> = T extends { done: TypedFunction }
  ? ReturnType<T["done"]>
  : T;
