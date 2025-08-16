import type { IsAny, IsNever } from "inferred-types/types";

/**
 * **HasIndexSignature**`<T>`
 *
 * Tests whether a container `T` has an _index signature_ as part of
 * it's type definition.
 */
export type HasIndexSignature<T> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : string extends keyof T ? true
            : number extends keyof T ? true
                : symbol extends keyof T ? true : false;
