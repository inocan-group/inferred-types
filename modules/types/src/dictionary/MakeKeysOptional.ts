import type { AnyObject, ObjectKey } from "../base-types";
import type { IsWideContainer, IsWideUnion } from "../boolean-logic";
import type { ExpandDictionary } from "../literals";
import type { WithKeys } from "./WithKeys";
import type { WithoutKeys } from "./WithoutKeys";

type ProcessTupleKeys<
  TObj extends AnyObject,
  TKeys extends readonly ObjectKey[],
> = ExpandDictionary<
  WithoutKeys<TObj, TKeys> & {
    [K in keyof WithKeys<TObj, TKeys>]?: K extends keyof TObj
      ? TObj[K]
      : never
  }
>;

type ProcessUnionKeys<
  TObj extends AnyObject,
  TKeys extends (string | symbol),
> = ExpandDictionary<
  WithoutKeys<TObj, TKeys> & {
    [K in keyof WithKeys<TObj, TKeys>]?: K extends keyof TObj
      ? TObj[K]
      : never
  }
>;

/**
 * **MakeKeysOptional**`<TObj, TKeys>`
 *
 * Makes a set of keys on a known object `TObj` become
 * _optional_ parameters while leaving the other properties
 * "as is".
 *
 * **Related:** `MakeKeysRequired`
 */
export type MakeKeysOptional<
  TObj extends AnyObject,
  TKeys extends (string | symbol) | readonly ObjectKey[],
> = IsWideContainer<TObj> extends true
  ? TObj
  : TKeys extends readonly ObjectKey[]
    ? ProcessTupleKeys<TObj, TKeys>
    : TKeys extends (string | symbol)
      ? IsWideUnion<TKeys> extends true
        ? never
        : ProcessUnionKeys<TObj, TKeys>
      : never;
