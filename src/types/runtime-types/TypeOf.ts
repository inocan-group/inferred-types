import { TYPE_OF } from "inferred-types";
import { IsUndefined , AnyFunction, AnyObject , TupleToUnion } from "src/types/index";

/**
 * **TypeOf**
 *
 * The possible _types_ returned by the Javascript `typeof` command.
 *
 * - most types such as `string`, `number`, `boolean`, `undefined`, etc. have very
 * straight forward "types"
 * - the `object` type however translates into `null` and any array or object
 * - even though `function` _is_ clearly separated from `object` at runtime with **typeof**
 * it does allow dictionary properties to be attached along with being a function. This
 * contrasts with Typescript which models an intersection between a function signature
 * and an object signature.
 *
 * **Related:** `TypeOfExtended`
 */
export type TypeOf = TupleToUnion<typeof TYPE_OF>;

/**
 * **TypeOfExtended**
 *
 * The base data structures we tend think of in Javascript including some
 * like `null` and `array` which are not reported by the **typeof** operator.
 *
 * This set of operators, while not natively supported by **typeof** is supported
 * by type and runtime utilities in this library.
 *
 * **Related:** `TypeOf`, `TypeTokens`
 */
export type TypeOfExtended = TypeOf | "null" | "array" | "function-with-props";

/**
 * **GetTypeOf**`<T>`
 *
 * type utility which converts a type string literal which represents
 * the value of this type from the standpoint of Javascript's `typeof`
 * operator.
 */
export type GetTypeOf<T> = (T extends string
  ? "string"
  : [T] extends [number] ? "number"
  : [T] extends [boolean] ? "boolean"
  : [T] extends [AnyFunction] ? "function"
  : [T] extends [AnyObject] | null | unknown[] ? "object"
  : [T] extends [bigint] ? "bigint"
  : [IsUndefined<T>] extends [true] ? "undefined"
  : [T] extends [symbol] ? "symbol"
  : never
) & TypeOf;

/**
 * **ConvertTypeOf**`<T>`
 *
 * Type utility which receives a `TypeOf` value and converts into a
 * comparable type.
 *
 * - please keep in mind that `object` types are converted to:
 *    ```ts
 *    AnyObject | null | unknown[]
 *    ```
 * - any runtime type which is seen as a `function` is converted to the
 * `AnyFunction` type alias which includes allowing for functions which
 * have dictionary props.
 */
export type ConvertTypeOf<T extends TypeOf> = T extends "string"
  ? string
  : T extends "number" ? number
  : T extends "object" ? AnyObject | null | unknown[]
  : T extends "undefined" ? undefined
  : T extends "function" ? AnyFunction
  : T extends "bigint" ? number
  : T extends "symbol" ? symbol
  : T extends "boolean" ? boolean
  : never;
