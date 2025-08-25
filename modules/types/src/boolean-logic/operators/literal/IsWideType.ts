import type { IsAny, IsLiteralLike, IsNever, IsUnion, IsUnknown, IsWideBoolean, IsWideUnion } from "inferred-types/types";

/**
 * **IsWideType**`<T>`
 *
 * Identifies types which are "wide" (and have a narrow variant):
 *
 * - string, number, and boolean types
 * - `string[]`, `number[]` array types
 * - wide union types like `string | number`
 *
 * **Note:**
 * - types such as `null` and `undefined` **are** considered wide.
 * - If the `T` passed in is _never_ the result of this operation is
 * ErrorCondition<"invalid-never"> but this can be made into whatever
 * you like by setting the `TNever` generic.
 * - If an ErrorCondition is in `T` then it will be bubbled up
 */
export type IsWideType<
    T
> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : [IsWideBoolean<T>] extends [true]
            ? true
            : [IsUnknown<T>] extends [true]
                ? boolean
                : [IsUnion<T>] extends [true]
                    ? IsWideUnion<T>
                    : [IsLiteralLike<T>] extends [true]
                        ? false
                        : true;
