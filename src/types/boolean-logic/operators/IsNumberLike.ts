import { DoesExtend } from "./DoesExtend";
import { IsEqual } from "./IsEqual";
import { IsNever } from "./IsNever";
import { IsNumber } from "./IsNumber";

/**
 * **IsNumberLike**`<T>`
 *
 * Boolean operator which validates that `T` is a number or `${number}`
 */
export type IsNumberLike<T> = IsNever<T> extends true
? false
: IsNumber<T> extends true
? true
: DoesExtend<T, `${number}`> extends true
? true
: false;
