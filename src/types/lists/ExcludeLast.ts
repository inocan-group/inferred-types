/* eslint-disable @typescript-eslint/no-explicit-any */

import { Last } from "./Last";

/**
 * **ExcludeLast**`<TList>`
 * 
 * Type utility which returns the array elements _other_ than the last item.
 * ```ts
 * // [1,2]
 * type T = ExcludeLast<[1,2,3]>;
 * ```
 */
export type ExcludeLast<
  TList extends readonly any[]
> = TList extends [...(infer Rest), Last<TList>]
  ? Rest
  : never;
