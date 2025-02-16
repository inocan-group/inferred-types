import type {
  AnyObject,
  ExpandDictionary,
  IsWideContainer,
  ObjectKey,
  WithKeys,
  WithoutKeys,
} from "inferred-types/types";

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
  TKeys extends readonly ObjectKey[],
> = IsWideContainer<TObj> extends true
  ? TObj
  : ProcessTupleKeys<TObj, TKeys>;

