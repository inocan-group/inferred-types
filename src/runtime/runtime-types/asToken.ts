
import {
  Narrowable,
  SimpleContainerToken,
  SimpleScalarToken,
  SimpleType,
  SimpleUnionToken
} from "src/types/index";
import {
  isBooleanLike,
  isNumberLike,
  isSimpleContainerToken,
  isSimpleScalarToken,
  simpleScalarToken,
  stripAfter,
  stripBefore,
  stripSurround
} from "src/runtime/index";
import { Never } from "src/constants/Never";

// TODO
export const asSimpleToken = <T extends Narrowable>(_val: T) => {
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
}

const _containerToToken: Record<string, unknown> = {
  "array(string)": "",
  "array(boolean)": "",
  "array(number)": "",
  "array(unknown)": "",
}

// const unionToToken : Record<string, unknown> = {
//   "Opt<string>": "<<union::[ <<string>>, <<undefined>> ]>>" as unknown ,
//   "Opt<number>": "<<union::[ <<number>>, <<undefined>> ]>>" as unknown,
//   "Opt<unknown>": "<<union::[ <<unknown>>, <<undefined>> ]>>" as unknown,
//   "Opt<boolean>": "<<union::[ <<boolean>>, <<undefined>> ]>>" as unknown,
// } satisfies Record<SimpleUnionToken, unknown>

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
    : val.startsWith("string(")
      ? stringLiteral(val).includes(",")
        ? `<<union::[ ${stringLiteral(val).split(/,\s{0,1}/).map(i => `"${i}"`).join(", ")} ]>>`
        : `<<string::${stringLiteral(val)}>>` as unknown
    : val.startsWith("number(")
      ? numericLiteral(val).includes(",")
        ? `<<union::[ ${numericLiteral(val).split(/,\s{0,1}/).join(", ")} ]>>` as unknown
        : `<<number::${numericLiteral(val)}>>` as unknown
      : `<<never>>` as unknown
  ) as SimpleType<T>
}

/**
 * converts a node in the union to a proper token or tokens
 */
const unionNode = <
  T extends string
>(node: T) => {
  return isNumberLike(node)
    ? `<<number::${node}>>`
    : isBooleanLike(node)
    ? `<<${node}>>`
    : isSimpleContainerToken(node)
    ? simpleContainerTokenToTypeToken(node) as unknown
    : isSimpleScalarToken(node)
    ? simpleScalarToken(node)
    : `<<string::${node}>>`
}

const union = <T extends string | readonly string[]>(nodes: T) => {
  return Array.isArray(nodes)
    ? nodes.map(n => unionNode(n))
    : nodes.includes(",")
      ? (nodes as string).split(/,\s{0,1}/).map(n => unionNode(n)).join(", ")
      : unionNode(nodes as string)
}

const stripUnion = stripSurround("Union(", ")");

/**
 * **simpleUnionTokenToTypeToken**`(val)`
 *
 * Converts a `SimpleUnionToken` to a `TypeToken` and converts the type to
 * the type _represented_ by the token.
 *
 * Note:
 * - when passing in _literals_ such as `opt(42)` it will evaluate the value
 * as being a numeric or a boolean literal and use that type if it is
 */
export const simpleUnionTokenToTypeToken = <T extends SimpleUnionToken>(val: T) => {
  return (
    val.startsWith(`Union(`) && val.endsWith(`)`)
      ? `<<union::[ ${union(stripUnion(val))} ]>>`
      : Never
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
export const simpleContainerTokenToTypeToken = <T extends SimpleContainerToken>(_val: T) => {
  // TODO
}


// TODO
export const asTypeToken = <T extends Narrowable>(_val: T) => {
  return "not ready"
}

