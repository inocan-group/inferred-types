import { Dictionary } from "../base-types/Dictionary";
import { ExpandDictionary } from "../literals";
import { WithKeys } from "./WithKeys";
import { WithoutKeys } from "./WithoutKeys";


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
