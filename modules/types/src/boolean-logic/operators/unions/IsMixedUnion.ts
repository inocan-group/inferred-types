import { IsUnion } from "inferred-types/types";


/**
 * **IsMixedUnion**`<T>`
 *
 * Test that `T` is a union type and:
 *
 * - some of the elements of the union are literal-like types
 * - some of the elements of the union are wide types
 *
 * **Related:** `IsLiteralUnion`, `IsNonLiteralUnion`, `IsWideUnion`
 */
export type IsMixedUnion<T> = IsUnion<T> extends true
? // TODO
false
: false;
