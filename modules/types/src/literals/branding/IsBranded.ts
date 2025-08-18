import { BrandSymbol } from "inferred-types/types";



/**
 * **IsBranded**`<T>`
 *
 * Boolean operator which tests whether `T` has been _branded_ with the
 * `Brand<T>` utility.
 */
export type IsBranded<T> = typeof BrandSymbol extends keyof T ? true : false;
