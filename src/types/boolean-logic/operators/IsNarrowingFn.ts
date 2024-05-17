/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnyFunction } from "../..";
import { Not } from "../combinators/Not";
import { IsEqual } from "./IsEqual";


type RegularFn<Fn> = Fn extends ((...args: any[]) => any)
? (...args: Parameters<Fn>) => ReturnType<Fn>
: false;


/**
 * **IsNarrowingFn**`<TFn>`
 * 
 * A boolean operator which checks whether `TFn` uses generics
 * to narrow the input parameters. This is in contrast to a function
 * which takes literal types rather than _extending_ them.
 * 
 * **Related:** `NarrowingFn`, `IsLiteralFn`
 */
export type IsNarrowingFn<TFn> = TFn extends AnyFunction
? Not<IsEqual<RegularFn<TFn>,TFn>>
: false;
