/* eslint-disable @typescript-eslint/ban-types */
import { FnWithDict } from "./fns/FnWithDict";
import { NarrowingFn } from "./fns/NarrowingFn";
import { RegularFn } from "./fns/RegularFn";
import { IndexableObject } from "./IndexableObject";

/**
 * **AnyFunction**`<[TArgs], [TReturn]`
 * 
 * A type which is meant to match on _all_ types of functions which can exist.
 * This includes basic functions as well as functions which have KeyValue dictionaries
 * in intersection with them.
 * 
 * **Note:** _you may optionally limit the types you are matching by using any of of 
 * the optional generics provided_
 */
export type AnyFunction<
  TArgs extends unknown[] = unknown[],
  TReturn = unknown,
  TDict extends IndexableObject = {}
> = RegularFn<TArgs,TReturn> | NarrowingFn<TArgs,TReturn> | FnWithDict<TDict,TArgs,TReturn>;
