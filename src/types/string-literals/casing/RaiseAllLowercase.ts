import { IsAllLowercase } from "inferred-types/dist/types/index";

/**
 * **RaiseAllLowercase**`<T>`
 *
 * Type utility which will convert an "all lowercase" string to a string where all characters are uppercase; in
 * all other cases it will do nothing and simply return `T` as `T`.
 *
 * **Related:** `LowerAllCaps`
 **/
export type RaiseAllLowercase<T extends string> = IsAllLowercase<T> extends true ? Uppercase<T> : T;

