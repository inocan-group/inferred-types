import { TYPE_OF } from "src/runtime/runtime/constants";
import { AnyObject, IsUndefined } from "../boolean-logic";
import { AnyFunction } from "../functions";
import { TupleToUnion } from "../type-conversion/TupleToUnion";

/**
 * **TypeOf**
 * 
 * The possible _types_ returned by the Javascript `typeof` command.
 */
export type TypeOf = TupleToUnion<typeof TYPE_OF>;

/**
 * **GetTypeOf**`<T>`
 * 
 * type utility which converts a type string literal which represents
 * the value of this type from the standpoint of Javascript's `typeof`
 * operator.
 */
export type GetTypeOf<T> = (T extends string 
  ? "string"
  : T extends number ? "number"
  : T extends boolean ? "boolean"
  : T extends AnyFunction ? "function"
  : T extends AnyObject | null | any[] ? "object"
  : T extends bigint ? "bigint"
  : IsUndefined<T> extends true ? "undefined"
  : T extends symbol ? "symbol"
  : never
) & TypeOf;

/**
 * **ConvertTypeOf**`<T>`
 * 
 * Type utility which receives a `TypeOf` value and converts into a 
 * comparable type.
 */
export type ConvertTypeOf<T extends TypeOf> = T extends "string"
  ? string
  : T extends "number" ? number
  : T extends "object" ? AnyObject | null | any[]
  : T extends "undefined" ? undefined
  : T extends "function" ? AnyFunction
  : T extends "bigint" ? number
  : T extends "symbol" ? symbol
  : T extends "boolean" ? boolean
  : never;