import { AnyObject } from "../base-types";
import { Keys } from "../dictionary";
import { Narrowable } from "../literals";
import { DigitNonZero } from "../string-literals/character-sets";


export type LeafNodeOptions = "ignore-ref" | "make-leaf-wide";
export type NodeTuple = [base: string, path: ...string[], kind: unknown];

type _ObjNodes<
  TContainer extends AnyObject,
  TKeys extends readonly unknown[], 
  TDepthLimit extends DigitNonZero,
  TOptions extends readonly LeafNodeOptions[],
  TCurrDepth extends DigitNonZero = "1",
  TResults extends readonly NodeTuple[] = []
> = any;

type _ArrNodes<
  TContainer extends readonly Narrowable[],
  TDepthLimit extends DigitNonZero,
  TOptions extends readonly LeafNodeOptions[]
> = never;

/**
 * **Nodes**`<TContainer,[TDepth,TOptions]>`
 * 
 * Converts an object or tuple of `T` into a nest graph of keys in the object.
 * ```ts
 * type Obj = { foo: 1; bar: { numbers: number[], strings: string[] }};
 * //
 * type G = LeafNodes<Obj>;
 * ```
 * 
 * The first optional parameter is `TDepth` which by default is set to 2. This property
 * represents the depth that Nodes will continue to move into containers with literal
 * types. You can go a maximum of 9 levels of depth but this is usually not a good idea
 * as the type complexity at this level will be too large.
 * 
 * Finally, this utility exposes two options in `TOptions`:
 * - **ignore-ref** - when set the graph will _not_ automatically navigate VueJS's
 * Ref<T> values. By default it will.
 * - **make-leaf-wide** - when reaching a leaf node 
 */
export type LeafNodes<
  TContainer extends AnyObject | readonly Narrowable[],
  TDepth extends DigitNonZero,
  TOptions extends readonly LeafNodeOptions[]
> = TContainer extends AnyObject
  ? _ObjNodes<TContainer & AnyObject, Keys<TContainer>, TDepth, TOptions>
  : TContainer extends readonly Narrowable[]
    ? _ArrNodes<TContainer & readonly Narrowable[], TDepth, TOptions>
    : never;


// ["foo", 1], ["bar", "numbers", number[]]
