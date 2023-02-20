import { AnyObject } from "../base-types";
import { IfLiteral } from "../boolean-logic";
import { Keys } from "../dictionary/Keys";
import { AfterFirst, First, IndexOf } from "../lists";
import { Retain } from "../lists/Retain";


export type KV = [kind: "KV", key: string, value: any];

type Serialize<
  TObj extends AnyObject,
  TKeys extends readonly (keyof TObj & string)[],
  TResults extends readonly KV[] = []
> = [] extends TKeys
  ? TResults
  : Serialize<
      TObj,
      AfterFirst<TKeys>,
      Readonly<[
        ...TResults,
        [ "KV", First<TKeys>, IndexOf<TObj, First<TKeys>> ]
      ]>
    >;

/**
 * **ToKV**`<TObj>`
 * 
 * Converts an object into a readonly array of `KV` items.
 * 
 * - this conversion is a shallow conversion so any _values_ which are
 * an object will remain an object.
 * - the `TExplicitKeys` is optional but useful if you need to express
 * a designated ordering of keys.
 * 
 * **Related:** `FromKV`
 */
export type ToKV<
  TObj extends AnyObject,
  TExplicitKeys extends readonly any[] | null = null
> = TObj extends AnyObject
    ? IfLiteral<
        TObj, 
        Serialize<TObj, Retain<Keys<TObj>, string>> extends readonly KV[]
          ? Serialize<
              TObj, 
              TExplicitKeys extends readonly any[]
                ? Retain<TExplicitKeys, string>
                : Retain<Keys<TObj>, string>
            >
          : never, 
        never
      >
    : never;
