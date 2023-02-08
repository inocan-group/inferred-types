import { AnyObject, IfContains } from "../boolean-logic";
import { Keys } from "./Keys";
import { AfterFirst, First } from "../lists";

type Shared<
  A extends readonly any[],
  B extends readonly any[],
  TOnlyDefined extends boolean = false, 
  TResults extends readonly any[] = []
> = [] extends A
  ? TResults
  : Shared<
      AfterFirst<A>,
      B,
      TOnlyDefined,
      IfContains<
        B, First<A>,
        [...TResults, First<A>],
        TResults
      >
    >;

/**
 * **SharedKeys**`<A,B, [TOnlyDefined]>`
 * 
 * Given two objects `A` and `B`, this type utility will provide those _keys_
 * which both objects contain.
 */
export type SharedKeys<
  A extends AnyObject,
  B extends AnyObject,
  TOnlyDefined extends boolean = false
> = Shared<Keys<A>,Keys<B>,TOnlyDefined>;
