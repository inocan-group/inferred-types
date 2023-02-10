import { AnyObject, IfContains } from "../boolean-logic";
import { Keys } from "./Keys";
import { AfterFirst, First } from "../lists";
import { Key } from "./Key";
import { IfLength } from "../boolean-logic/IfLength";

type Shared<
  A extends readonly any[],
  B extends readonly any[],
  TResults extends readonly Key[] = []
> = [] extends A
  ? TResults
  : Shared<
      AfterFirst<A>,
      B,
      IfContains<
        B, First<A>,
        [...TResults, First<A> & Key],
        TResults
      >
    >;

/**
 * **SharedKeys**`<A,B>`
 * 
 * Given two objects `A` and `B`, this type utility will provide the _keys_
 * which both objects contain.
 * ```ts
 * type O1 = { foo: 1; bar: 2; baz: 88 };
 * type O2 = { bar: 5; baz: 3; nada: true };
 * // readonly ["bar", "baz"] & readonly ("bar" | "baz")[]
 * type X = SharedKeys<O1,O2>;
 * ```
 * 
 * **Note:** intersecting with the union type allows the 
 * criteria of extending _keyof A_ and _keyof B_.
 */
export type SharedKeys<
  A extends AnyObject,
  B extends AnyObject
> = IfLength<
Shared<Keys<A>,Keys<B>>, 0,
readonly [],
Shared<
  Keys<A>,Keys<B>
> & readonly (Key & keyof A & keyof B)[]
>;
