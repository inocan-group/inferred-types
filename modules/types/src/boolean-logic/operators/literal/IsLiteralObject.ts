import { AnyFunction, Each, IsAny, IsLiteralScalar, IsNever, IsTuple, Scalar, Values } from "inferred-types/types";

/**
 * **IsLiteralObject**`<T>`
 *
 * Boolean operator which tests whether `T` is a literal object.
 */
export type IsLiteralObject<T> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
: IsTuple<T> extends T
? false
: T extends AnyFunction
? false
: T extends object
    ? number extends keyof T
        ? false
        : Each<Values<T>, "isLiteral">
: T extends Scalar
    ? IsLiteralScalar<T>
: false;
