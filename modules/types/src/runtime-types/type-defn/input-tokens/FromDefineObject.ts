import type {
    DefineObject,
    FromInputToken__Object,
} from "inferred-types/types";

/**
 * **FromDefineObject**`<T>`
 *
 * Converts a `DefineObject` _definition_ into the **type** which it
 * it defines.
 *
 * **Note:**
 * - this is just an alias of `FromInputToken__Object` but with a
 * cooler name
 */
export type FromDefineObject<
    T extends DefineObject
> = FromInputToken__Object<T>;
