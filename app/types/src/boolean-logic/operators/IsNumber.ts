import { IsUnion, WidenUnion } from "src/types/index";

/**
 * **IsNumber**`<T>`
 *
 * Boolean type utility testing whether `T` is a numeric type.
 */
export type IsNumber<T> = [IsUnion<T>] extends [true]
? WidenUnion<T> extends number
  ? true
  : number extends WidenUnion<T>
    ? boolean
    : false
: [T] extends [number] ? true : false;
