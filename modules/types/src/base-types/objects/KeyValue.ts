import type { ObjectKey } from "inferred-types/types";

/**
 * **KeyValue**
 *
 * A type used by utilities like `ToKv` and `FromKv` to convert
 * a Dictionary into a tuple of KeyValue's (or visa-versa).
 */
export type KeyValue<
    K = ObjectKey,
    V = any,
    R = boolean
> = {
    /** the _key_ of an object */
    key: K;
    /** the _value_ of the object's @ `key` */
    value: V;
    /**
     * whether this key/value pair is _required_ in the object definitions
     */
    required: R
};
