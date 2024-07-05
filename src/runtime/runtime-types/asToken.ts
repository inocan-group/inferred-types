import { Narrowable } from "src/types/literals";
import { SimpleContainerToken, SimpleScalarToken, SimpleType } from "src/types/runtime-types";
import { stripAfter, stripBefore } from "../literals";


// TODO
export const asSimpleToken = <T extends Narrowable>(val: T) => {
  return "not ready"
}

const scalarToToken: Record<string, unknown> = {
  string: "<<string>>" as string,
  number: "<<number>>" as unknown,
  boolean: "<<boolean>>" as unknown,
  true: "<<true>>" as unknown,
  false: "<<false>>" as unknown,
  null: "<<null>>" as unknown,
  undefined: "<<undefined>>" as unknown,
  unknown: "<<unknown>>" as unknown,
  any: "<<any>>" as unknown ,
  never: "<<never>>" as unknown,
  "opt(string)": "<<union::[<<string>>, <<undefined>>]>>" as unknown ,
  "opt(number)": "<<union::[<<number>>, <<undefined>>]>>" as unknown,
  "opt(boolean)": "<<union::[<<boolean>>, <<undefined>>]>>" as unknown ,
}

const stringLiteral = <T extends string>(str: T) => {
  return stripAfter(stripBefore(str, "string("), ")")
}
const numericLiteral = <T extends string>(str: T) => {
  return stripAfter(stripBefore(str, "number("), ")")
}

/**
 * **simpleScalarTokenToTypeToken**`(val)`
 *
 * Receives a `SimpleScalarToken` and converts it's runtime value to a
 * more full fledged `TypeToken` while converting the _type_ to be the
 * type that the token represents.
 *
 * **Related:** `simplContainerTokenToTypeToken`, `asTypeToken`
 */
export const simpleScalarTokenToTypeToken = <T extends SimpleScalarToken>(val: T) => {
  return (
    val in scalarToToken
    ? scalarToToken[val as keyof typeof scalarToToken] as unknown
    : val.startsWith("string(") as unknown
      ? stringLiteral(val).includes(",")
        ? `<<union::[ ${stringLiteral(val).split(/,\s{0,1}/).map(i => `"${i}"`).join(", ")} ]>>`
        : `<<string::${stringLiteral(val)}>>` as unknown
    : val.startsWith("number(") as unknown
      ? numericLiteral(val).includes(",")
        ? `<<union::[ ${numericLiteral(val).split(/,\s{0,1}/).join(", ")} ]>>` as unknown
        : `<<number::${numericLiteral(val)}>>` as unknown
      : `<<never>>` as unknown
  ) as SimpleType<T>
}

/**
 * **simpleContainerTokenToTypeToken**`(val)`
 *
 * Receives a `SimpleContainerToken` and converts it's runtime value to a
 * more full fledged `TypeToken` while converting the _type_ to be the
 * type that the token represents.
 *
 * **Related:** `simpleScalarTokenToTypeToken`, `asTypeToken`
 */
export const simpleContainerTokenToTypeToken = <T extends SimpleContainerToken>(val: T) => {
  // TODO
}


// TODO
export const asTypeToken = <T extends Narrowable>(val: T) => {
  return "not ready"
}

