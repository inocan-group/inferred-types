import { IsAny, IsLiteralObject, IsLiteralTuple, IsNever,Container } from "inferred-types/types";


/**
 * **IsLiteralContainer**`<T>`
 *
 * Tests `T` to see if it's a literal container (object or array).
 */
export type IsLiteralContainer<T> =
[IsAny<T>] extends [true] ? false
: [IsNever<T>] extends [true] ? false
: T extends Container
    ? T extends any[]
        ? IsLiteralTuple<T>
    : T extends object
        ? IsLiteralObject<T>
    : never
: false;
