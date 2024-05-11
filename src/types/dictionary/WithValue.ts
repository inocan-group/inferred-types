import { MARKED } from "src/constants/index";
import { 
  Compare,
  ExpandRecursively,
  If, 
  KV,
  IsEqual,
  EmptyObject
} from "src/types/index";
import { RemoveMarked } from "../containers/RemoveMarked";

type Marked = typeof MARKED;

type Process<
  TObj extends KV,
  TValue,
  TOp extends "equals" | "extends"
> = RemoveMarked<{
    [K in keyof TObj]: If<
      Compare<TObj[K], TOp, TValue>,
      TObj[K],
      Marked
    >
}>;

/**
 * **WithValue**`<TObj,TValue>`
 *
 * Reduces an object's type down to only those key/value pairs where the
 * value is of type `W`.
 * ```ts
 * const foo = { a: 1, b: "hi", c: () => "hello" }
 * // { c: () => "hello" }
 * type W = WithValue<typeof foo, Function>
 * ```
 * 
 * **Related:** `WithoutValue`, `WithKeys`, `WithoutKeys`
 */
export type WithValue<
  TObj extends KV,
  TValue,
  TOp extends "equals" | "extends" = "extends"
> = If<
  IsEqual<
    ExpandRecursively<Process<TObj,TValue,TOp>>, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  >,
  EmptyObject,
  ExpandRecursively<Process<TObj,TValue,TOp>>
>;
