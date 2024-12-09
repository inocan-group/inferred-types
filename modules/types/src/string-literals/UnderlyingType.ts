import { AsBoolean, AsNumber, BooleanLike, NumberLike } from "inferred-types/types";

type Process<
T
> = T extends NumberLike
? AsNumber<T>
: T extends BooleanLike
? AsBoolean<T>
: T;


/**
 * **UnderlyingType**`<T>`
 *
 * If `T` is a string literal which is `NumberLike` or `BooleanLike`
 * then it converts it to the appropriate numeric or boolean type.
 *
 * If `T` is a tuple then it will apply this logic to all elements
 * in the tuple.
 *
 * In all other cases it simply proxies the type of `T` through.
 */
export type UnderlyingType<
  T
> = T extends readonly unknown[]
? {
  [K in keyof T]: Process<T[K]>
}
: Process<T>;
