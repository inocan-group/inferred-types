 import {
  CivilianTime,
  Dictionary,
  Ip4Address,
  Ip6Address,
  MilitaryTime,
  StringTokenUtilities,
  TimeResolution,
  TokenBaseType,
  TupleToUnion,
  TypeTokenSingletons,
  Zip5,
  ZipPlus4,
  ZipCode,
  SimpleToken,
} from "@inferred-types/types";

import { addToken } from "./addToken"
import { regexToken } from "./regexToken";

type Token<T extends string> = `<<${T}>>`;


/**
 * Generates a token and then types it appropriates for the given Singleton
 */
const addSingleton = <
  T extends TypeTokenSingletons,
  Api extends Dictionary | null = null
>(token: T, api?: Api) => <
  L extends readonly TokenBaseType<Token<T>>[]
>(
  ...literals: L
) => {
  return (
    literals.length === 0
    ? api
      ? api
      : addToken(token)
    : literals.length === 1
    ? addToken(token,literals[0] as any)
    : addToken(
        "union",
        literals
          .map((l: TokenBaseType<any>) => addToken(token, `${l}`))
          .join(",")
      )
  ) as unknown as L["length"] extends 0
    ? Api extends Dictionary
      ? Api
      : TokenBaseType<Token<T>>
    : L["length"] extends 1
      ? L[0]
      : TupleToUnion<L>;
}


const stringApi: StringTokenUtilities<string> = ({
  startsWith: <T extends string>(startsWith: T) => addToken(`string-set`,`startsWith::${startsWith}`) as `${T}${string}`,
  endsWith: <T extends string>(endsWith: T) => addToken(`string-set`,`endsWith::${endsWith}`) as `${string}${T}`,
  zip: () => addToken("string-set","Zip5") as Zip5,
  zipPlus4: () => addToken("string-set", "Zip5_4") as ZipPlus4,
  zipCode: () => addToken("string-set", "ZipCode") as ZipCode,
  militaryTime: <T extends TimeResolution="HH:MM">(resolution?: T) => {
    return addToken(
      "string-set",
      "militaryTime",
      resolution || "HH:MM"
    ) as unknown as MilitaryTime<T>
  },
  civilianTime: <T extends TimeResolution="HH:MM">(resolution?: T) => {
    return addToken(
      "string-set",
      "militaryTime",
      resolution || "HH:MM"
    ) as unknown as CivilianTime<T>
  },
  numericString: () => addToken("string-set", "numeric") as unknown as `${number}`,
  ipv4Address: () => addToken("string-set", "ipv4Address") as unknown as Ip4Address,
  ipv6Address: () => addToken("string-set", "ipv6Address") as unknown as Ip6Address,

  regex: <
    TExp extends string | RegExp,
    TRepresentation extends readonly SimpleToken[]
  >(
    exp: TExp,
    ...literalRepresentation: TRepresentation
  ) => {
    const token = regexToken(exp, ...literalRepresentation);

    return token
  },

  done: () => addToken("string")
})
/**
 * **string**
 *
 * The API surface for adding string tokens
 */
export const string = addSingleton("string", stringApi);

/**
 * **number**
 *
 * The API surface for adding number tokens
 */
export const number = addSingleton("number");
