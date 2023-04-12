import type {  
  Narrowable,
  Box,
} from "src/types";
import { keysOf } from "src/runtime";


export type BoxValue<T extends Box<unknown>> = T extends Box<infer V> ? V : never;

export type BoxedFnParams<T extends Box<unknown>> = T extends Box<infer V>
  ? V extends (...args: infer A) => unknown
    ? A
    : []
  : [];


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
    unbox: (<P extends unknown[], R extends Narrowable>(...p: P): R => {
      return typeof value === "function" ? value(...p) : value;
    }) as Box<T>["unbox"],
  };

  return rtn;
}

export function isBox(thing: Narrowable): thing is Box<unknown> {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof thing === "object" && "__type" in (thing as object) && (thing as any).__type === "box"
  );
}

/**
 * **boxDictionaryValues**(dict)
 *
 * Runtime utility which boxes each value in a dictionary
 */
export function boxDictionaryValues<T extends object>(dict: T) {
  return keysOf(dict).reduce(
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
  return (isBox(val) 
    ? val.value 
    : val
  ) as Unbox<T>;
}
