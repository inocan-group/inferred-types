import { Dictionary } from "../base-types/Dictionary";
import { ExpandDictionary } from "../literals";
import { WithKeys } from "./WithKeys";
import { WithoutKeys } from "./WithoutKeys";

/**
 * **MakeKeysOptional**`<TObj, TKeys>`
 * 
 * Makes a set of keys on a known object `TObj` become 
 * _optional_ parameters while leaving the other properties
 * "as is".
 */
export type MakeKeysOptional<
  TObj extends Dictionary,
  TKeys extends readonly string[]
> = ExpandDictionary<
  WithoutKeys<TObj, TKeys> & {
    [K in keyof WithKeys<TObj,TKeys>]?: K extends keyof TObj
      ? TObj[K]
      : never
  }
>
