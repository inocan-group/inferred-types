

import { AnyFunction } from "inferred-types/dist/types/index";
import { IsEqual } from "./IsEqual";


type RegularFn<Fn> = Fn extends ((...args: any[]) => any)
? (...args: Parameters<Fn>) => ReturnType<Fn>
: false;


/**
 * **IsLiteralFn**`<TFn>`
 *
 * A boolean operator which checks that `TFn`:
 *
 * - is a function
 * - does not use generics to narrow input parameters
 *
 * **Related:** `LiteralFn`, `IsNarrowFn`
 */
export type IsLiteralFn<TFn> = TFn extends AnyFunction
? IsEqual<RegularFn<TFn>,TFn>
: false;
