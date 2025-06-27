import type { ObjectKey } from "inferred-types/types";

/**
 * **KeyValue**
 *
 * A type used by utilities like `ToKv` and `FromKv` to convert
 * a Dictionary into a tuple of KeyValue's (or visa-versa).
 *
 * - you may optionally provide a `required` property
 */
export type KeyValue<
    K = ObjectKey,
    V = any
> = { key: K; value: V; required?: boolean };
