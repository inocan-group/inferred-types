import type { DoesExtend } from "./DoesExtend";

import type { IsNever } from "./IsNever";
import type { IsNumber } from "./IsNumber";

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
