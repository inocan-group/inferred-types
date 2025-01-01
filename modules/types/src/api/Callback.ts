import type { AsNarrowingFn } from "inferred-types/types";

/**
 * **Callback**`<[TArgs], [TRtn]>`
 *
 * Defines the general shape of a _callback function_.
 */
export type Callback<
  TArgs extends readonly unknown[] = unknown[],
  TRtn = unknown,
> = AsNarrowingFn<TArgs, TRtn>;
