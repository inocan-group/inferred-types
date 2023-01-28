import type { 
  AfterFirst, 
  AnyFunction, 
  HasParameters, 
  Narrowable,
  First
} from "../../types";
import { keys } from "runtime/dictionary/keys";

export interface Box<T> {
  __type: "box";
  value: T;
  /**
   * Unbox the boxed value in the narrowest possible type.
   *
   * **note:** if the boxed value is a function with parameters you
   * can pass the parameters directly into the `b.unbox(params)` call.
   */
  unbox: HasParameters<Box<T>["value"]> extends true
    ? Box<T>["value"] extends AnyFunction
      ? Box<T>["value"] extends (...args: infer A) => infer R
        ? <N extends A>(...args: N) => R
        : () => ReturnType<T>
      : () => T
    : () => T;
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
    __type: "box",
    value,
    unbox: (<P extends any[], R extends Narrowable>(...p: P): R => {
      return typeof value === "function" ? value(...p) : value;
    }) as Box<T>["unbox"],
  };

  return rtn;
}

export function isBox(thing: Narrowable): thing is Box<any> {
  return (
    typeof thing === "object" && "__type" in (thing as object) && (thing as any).__type === "box"
  );
}

/**
 * **boxDictionaryValues**(dict)
 *
 * Runtime utility which boxes each value in a dictionary
 */
export function boxDictionaryValues<T extends {}>(dict: T) {
  return keys(dict).reduce(
    (acc, key) => ({ ...acc, [key]: box(dict[key]) }),
    {} as {
      [K in keyof T]: Box<T[K]>;
    }
  );
}

export type Unbox<T> = T extends Box<infer U> ? U : T;

//TODO: it would make sense in the future to use `b.unbox` instead
// of `b.value` to keep consistent but currently value behaves more
// consistently and with somewhat stronger typing

/**
 * **unbox**(maybeBox)
 *
 * Unboxes a value if it was a box; otherwise it leaves _as is_.
 */
export function unbox<T>(val: T): Unbox<T> {
  return isBox(val) ? val.value : val;
}
