import { DefineObject } from "src/types/dictionary";
import { FromDefn } from "src/types/literals";
import {
  AsType,
  ShapeCallback,
  SimpleScalarToken,
  SimpleToken,
  SimpleType
} from "src/types/runtime-types";
import { isFunction } from "../type-guards/isFunction";
import {  ShapeApiImplementation } from "./shape";
import { handleDoneFn } from "../api";
import { isDefineObject } from "../type-guards";
import { asDefineObject } from "./asDefineObject";

/**
 * **asType**(token)**
 *
 * Converts a `SimpleToken` into it's corresponding _type_.
 *
 * - also allows a `ShapeCallback` for more advanced types
 *    - this includes `DefineObject` key-values
 *    - also allows tuple generation
 * - note: that tokens generated with the callback approach
 * is not fully reverse engineerable at this point; this will
 * be added later
 */
export const asType = <
  T extends [SimpleToken | DefineObject ] | readonly (SimpleToken | DefineObject | ShapeCallback)[]
>(...token: T) => {

  return (
    isFunction(token)
      ? token(ShapeApiImplementation)
      : token.length === 1
        ? isFunction(token[0])
          ? handleDoneFn(token[0](ShapeApiImplementation))
          : isDefineObject(token[0])
            ? asDefineObject(token[0])
            : token[0]
        : token.map(i => isFunction(i) ? handleDoneFn(i(ShapeApiImplementation)) : i)
  ) as unknown as T extends [SimpleToken]
    ?  SimpleType<T[0]>
    : T extends [DefineObject]
      ? FromDefn<T[0]>
      : T extends readonly (SimpleToken | DefineObject | ShapeCallback)[]
      ? FromDefn<T>
      : never
}

export const asStringLiteral = <
  T extends readonly SimpleScalarToken[]
>(...values: T) => {

  return values.map(i => i as unknown as AsType<typeof i>)
}

