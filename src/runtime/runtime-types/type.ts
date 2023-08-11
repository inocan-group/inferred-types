import {  
  Narrowable, 
  TimeInMinutes, 
  TupleToUnion, 
  TypeToken, 
  UpperAlphaChar ,
  Tuple,
  Time,
  AnyObject,
} from "src/types";

const t = <T extends Narrowable | Tuple>(token: TypeToken) => {
  return token as unknown as T;
};

/**
 * **type** 
 * 
 * An API surface for creating a _type_ at runtime while preserving that type
 * as a `TypeToken` as it's runtime value.
 */
export const type =  {
  string: () => t<string>("<<string>>"),
  numericString: () => t<`${number}`>("<<numericString>>"),
  booleanString: () => t<`${boolean}`>("<<booleanString>>"),
  number: () => t<number>("<<number>>"),
  boolean: () => t<boolean>("<<boolean>>"),
  object: () => t<AnyObject>("<<object>>"),
  objectLiteral: <T extends AnyObject>(obj: T) => t<T>(`<<objectLiteral:${JSON.stringify(obj)}>>`),
  true: () => t<true>("<<true>>"),
  false: () => t<false>("<<false>>"),
  undefined: () => t<undefined>("<<undefined>>"),
  startsWith: <T extends string>(startWith: T) => t<`${T}${string}`>(`<<startsWith:${startWith}>>`),
  endsWith: <T extends string>(endWith: T) => t<`${T}${string}`>(`<<startsWith:${endWith}>>`),
  null: () => "<null>" as unknown as null,
  literal: <T extends Narrowable[]>(...literals: T) => literals,
  union: <T extends readonly Narrowable[]>(...union: T) => `union:${union.join(",")}` as TupleToUnion<T>,
  explicitType: <T extends Narrowable>(typeName: `${UpperAlphaChar}${string}`) => t<T>(`<<explicitType:${typeName}>>`),
  timeInMinutes: <T extends TimeInMinutes>(time: T) => t<Time>(`<<timeInMinutes:${time}>>`),

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

