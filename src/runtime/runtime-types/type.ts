import {  Narrowable, Tuple, TupleToUnion, TypeToken, UpperAlphaChar } from "src/types";

const token = <T extends Narrowable | Tuple>(token: TypeToken) => {
  return token as unknown as T;
};

/**
 * **type** 
 * 
 * An API surface for creating a _type_ at runtime while preserving that type
 * as a `TypeToken` as it's runtime value.
 */
export const type = {
  string: () => token<string>("<<string>>"),
  numericString: () => token<`${number}`>("<<numeric-string>>"),
  booleanString: () => token<`${boolean}`>("<<boolean-string>>"),
  number: () => token<number>("<<number>>"),
  boolean: () => token<boolean>("<<boolean>>"),
  true: () => token<true>("<<true>>"),
  false: () => token<false>("<<false>>"),
  undefined: () => token<undefined>("<<undefined>>"),
  startsWith: <T extends string>(startWith: T) => token<`${T}${string}`>(`<<startsWith:${startWith}>>`),
  endsWith: <T extends string>(endWith: T) => token<`${T}${string}`>(`<<startsWith:${endWith}>>`),
  null: () => "<null>" as unknown as null,
  literal: <T extends Narrowable[]>(...literals: T) => literals,
  union: <T extends readonly Narrowable[]>(...union: T) => `union:${union.join(",")}` as TupleToUnion<T>,
  explicitType: <T extends Narrowable>(typeName: `${UpperAlphaChar}${string}`) => token<T>(`<<explicitType:${typeName}>>`)
} as const;

/**
 * **RunType** API (aka, `type`)
 * 
 * Provides convenient way to create a type at runtime where the
 * type information is what's important. The type will be set but
 * the runtime value will be set to an appropriate `TypeToken` as
 * well.
 */
export type RunTypeApi = typeof type;

