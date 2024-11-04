import { Constant } from "inferred-types";
import {
  RemoveMarked,
  Widen,
  ExpandDictionary,
  First,
  AfterFirst,
  MakeKeysOptional,
  Contains,
  Dictionary,
  EmptyObject,
} from "src/types/index";

const s = Symbol("Dict");

/**
 * **Dict**`<T, ID>`
 *
 * A nominal replacement for Javascript object's with precisely
 * the same functionality but with a hashed type which allows
 * use of `let` instead of `const` for object definitions due
 * to the type not being able to be reassigned.
 */
export type Dict<T extends Dictionary = EmptyObject, ID extends string = string> = {
  [s]: ID;
} & T;

export type OptDictProps<
  T extends readonly string[]
> = RemoveMarked<{
  [K in keyof T]: T[K] extends `opt:${infer Prop}`
  ? Prop extends string
  ? Prop
  : Constant<"Marked">
  : Constant<"Marked">
}>;

export type NarrowDictProps<
  T extends readonly string[]
> = [] extends T
  ? T
  : RemoveMarked<{
    [K in keyof T]: T[K] extends `opt:${string}`
    ? Constant<"Marked">
    : T[K]
  }>;

export type CreateDictShape<
  TObj extends Dictionary,
  TKeys extends readonly (string & keyof TObj)[],
  TNarrow extends readonly string[],
  TOpt extends readonly string[],
  TResult extends Dictionary = EmptyObject
> = [] extends TKeys
  ? OptDictProps<TKeys> extends readonly string[]
  ? MakeKeysOptional<
    ExpandDictionary<TResult>,
    TOpt
  >

  : never
  : CreateDictShape<
    TObj,
    AfterFirst<TKeys>,
    TNarrow,
    TOpt,
    TResult & Record<
      First<TKeys>,
      Contains<TNarrow, First<TKeys>> extends true
      ? TObj[First<TKeys>]
      : Widen<TObj[First<TKeys>]>
    >
  >;

export type CreateDictHash<
  TValues extends readonly unknown[],
  TNarrowProps extends readonly string[],
  TOpt extends readonly string[],
> = `${TValues["length"]}${TNarrowProps["length"]}${TOpt["length"]}`;
