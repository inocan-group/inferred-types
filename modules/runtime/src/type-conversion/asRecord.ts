import type { AsRecord, ObjectKey } from "inferred-types/types";

/**
 * **asRecord**`<T>`(obj: T) → AsRecord`<T>`
 *
 * An "identity function" with regards to runtime information but
 * helps convert a `object` to a `Record<ObjectKey,unknown>` which
 * is indexable.
 */
export function asRecord<
  T extends Record<ObjectKey, unknown> | object,
>(obj: T): AsRecord<T> {
  return obj as AsRecord<T>;
}
