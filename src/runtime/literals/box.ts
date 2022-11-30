import { AfterFirst, Narrowable } from "src/types";
import { First } from "src/types/lists/First";

export interface Box<T> {
  __kind: "box";
  value: T;
  /**
   * Unbox the boxed value in the narrowest possible type.
   *
   * **Note:** _if you want a wider type definition use `wide()`
   * instead._
   */
  unbox(): T;
  // /**
  //  * If the boxed value is a function with generics then you have opportunity to
  //  * _narrow_ the type definition over time. This is achieved in a type strong manner,
  //  * so you can't change the fundamental type but this example will work as expected:
  //  * ```ts
  //  * const fn = <T extends string>(name: T) => `Hello ${name}` as const;
  //  * const b = box(fn);
  //  * // later
  //  * const b2 = b.narrow<"foo" | "bar">();
  //  * ```
  //  */
  // narrow: NarrowBox<T>;
}

export type BoxValue<T extends Box<any>> = T extends Box<infer V> ? V : never;

export type BoxedFnParams<T extends Box<any>> = T extends Box<infer V>
  ? V extends (...args: infer A) => any
    ? A
    : []
  : [];

export type BoxedReturn<T extends Box<any>> = T extends Box<infer V>
  ? V extends Function
    ? ReturnType<T["value"]>
    : T["value"]
  : never;

export type NarrowBox<T> = <
  N extends BoxedFnParams<Box<T>> | First<BoxedFnParams<Box<T>>>
>() => N extends BoxedFnParams<Box<T>>
  ? T extends (...args: any[]) => any
    ? (...args: N) => Box<T>["unbox"]
    : never
  : (first: N, ...rest: AfterFirst<BoxedFnParams<Box<T>>>) => BoxedReturn<Box<T>>;

/**
 * Allows a value with an inner-type to be boxed into a dictionary
 * so that this type inference is preserved with the help of
 * [instantiation expressions](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#instantiation-expressions).
 *
 * NOTE: this feature is immature at best right now
 */
export function box<T extends Narrowable>(value: T): Box<T> {
  const rtn: Box<T> = {
    __kind: "box",
    value,
    unbox: () => value,
  };

  return rtn;
}

export function isBox(thing: unknown): thing is Box<any> {
  return (
    typeof thing === "object" && "__kind" in (thing as object) && (thing as any).__kind === "box"
  );
}

export type Unbox<T> = T extends Box<infer U> ? U : T;

export function unbox<T>(thing: T): Unbox<T> {
  return isBox(thing) ? thing.unbox() : thing;
}
