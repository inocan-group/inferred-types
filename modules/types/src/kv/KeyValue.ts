import type { As, ObjectKey, Unset } from "inferred-types/types";

/**
 * A dictionary which contains a `key` and `value` property.
 *
 * - you may optionally provide a `required` property
 */
export type KeyValue<
    K = ObjectKey,
    V = any
> = { key: K; value: V; required?: boolean }
