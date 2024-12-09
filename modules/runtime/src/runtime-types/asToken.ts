
import {
  SimpleContainerToken,
  SimpleScalarToken,
  SimpleType,
  SimpleUnionToken,
  TypeToken
} from "inferred-types/types";
import {
  identity,
  isBooleanLike,
  isNumberLike,
  isSimpleContainerToken,
  isSimpleScalarToken,
  simpleScalarToken,
  stripAfter,
  stripBefore,
  stripLeading,
  stripSurround,
  stripTrailing
} from "inferred-types/runtime";
import { Never } from "inferred-types/constants";

const scalarToToken = identity({
  string: "<<string>>",
  number: "<<number>>",
  boolean: "<<boolean>>",
  true: "<<true>>",
  false: "<<false>>",
  null: "<<null>>",
  undefined: "<<undefined>>",
  unknown: "<<unknown>>",
  any: "<<any>>" ,
  never: "<<never>>",
});

const _containerToToken: Record<string, unknown> = {
  "array(string)": "",
  "array(boolean)": "",
  "array(number)": "",
  "array(unknown)": "",
}

const stringLiteral = <T extends string>(str: T) => {
  return stripAfter(stripBefore(str, "string("), ")")
}
const numericLiteral = <T extends string>(str: T) => {
  return stripAfter(stripBefore(str, "number("), ")")
}

const handleOptional = <T extends SimpleScalarToken>(token: T) => {
  const bare = stripTrailing(stripLeading(token, "Opt<"), ">");

  return bare.startsWith("string")
    ? `<<union::[ <<string>>, <<undefined>> ]>>`
    : bare.startsWith("number")
    ? `<<union::[ <<number>>, <<undefined>> ]>>`
    : bare.startsWith("boolean")
    ? `<<union::[ <<boolean>>, <<undefined>> ]>>`
    : bare.startsWith("unknown")
    ? `<<union::[ <<unknown>>, <<undefined>> ]>>`
    : `<<never>>`
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
    : val.startsWith("Opt<")
      ? handleOptional(val)
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
export const asTypeToken = <T extends TypeToken>(_val: T) => {
  return "not ready"
}

