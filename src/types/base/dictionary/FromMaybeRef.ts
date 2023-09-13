import { IsRef } from "..";

/**
 * **FromMaybeRef**`<T>`
 * 
 * Dereferences the `value` property on VueJS `Ref<T>`'s otherwise
 * returns `T` as is.
 */
export type FromMaybeRef<T> = IsRef<T> extends true
  ? "value" extends keyof T
    ? T["value"]
    : never
  : T;
