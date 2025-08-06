import { HasTemplateLiteral } from '../sets/HasTemplateLiteral';
import type {
    Dictionary,
    IsWideObject,
    RequiredKeysTuple,
} from "inferred-types/types";

/**
 * **HasRequiredProps**`<T>`
 *
 * Receives `T` and returns true/false based on whether
 * the `T` is an object _and_ has at least one required property on it.
 */
export type HasRequiredProps<
    T extends Dictionary,
> = IsWideObject<T> extends true
    ? boolean
    : [RequiredKeysTuple<T>["length"]] extends [0]
        ? false
        : true;


