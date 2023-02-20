/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { AnyObject } from "./AnyObject";

/**
 * **AnyFunction**`<[TArgs],[TReturn],[TDict]>`
 * 
 * A type which is meant to match on _all_ types of functions which can exist.
 * This includes basic functions as well as functions which have KeyValue dictionaries
 * in intersection with them.
 * 
 * **Note:** _you may optionally limit the types you are matching by using any of of 
 * the optional generics provided_
 */
export type AnyFunction<
  TArgs extends readonly any[] = any[],
  TReturn = any,
  TProps extends AnyObject | "no-props" = AnyObject | "no-props",
> = TProps extends "no-props"
  ? (...args: TArgs) => TReturn
  : ((...args: TArgs) => TReturn) & TProps;
