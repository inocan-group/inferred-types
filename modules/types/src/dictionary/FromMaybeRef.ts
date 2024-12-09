import type { IsVueRef } from "inferred-types/types";

/**
 * **FromMaybeRef**`<T>`
 *
 * Dereferences the `value` property on VueJS `Ref<T>`'s otherwise
 * returns `T` as is.
 */
export type FromMaybeRef<T> = IsVueRef<T> extends true
  ? "value" extends keyof T
    ? T["value"]
    : never
  : T;
