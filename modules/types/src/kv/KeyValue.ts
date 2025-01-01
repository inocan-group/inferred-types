import type { ObjectKey } from "inferred-types/types";

/**
 * A dictionary which contains a `key` and `value` property.
 */
export interface KeyValue<
  K = ObjectKey,
  V = any,
> { key: K; value: V }
