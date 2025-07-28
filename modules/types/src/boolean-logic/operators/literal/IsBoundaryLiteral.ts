import { IsAny, IsNever } from "inferred-types/types";

/**
 * **IsLiteralBoundary**`<T>`
 *
 * Boolean operator which tests whether `T` is a Boundary Literal (e.g., `any` or `never`).
 */
export type IsLiteralBoundary<T> = [IsAny<T>] extends [true]
? true
: [IsNever<T>] extends [true]
? true
: false;

