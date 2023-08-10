import {  
  Narrowable, 
  TimeInMinutes, 
  TimeInSeconds,
  TupleToUnion, 
  TypeToken, 
  UpperAlphaChar ,
  MilitaryTime,
  Tuple,
  Time,
  CivilianTime
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
  numericString: () => t<`${number}`>("<<numeric-string>>"),
  booleanString: () => t<`${boolean}`>("<<boolean-string>>"),
  number: () => t<number>("<<number>>"),
  boolean: () => t<boolean>("<<boolean>>"),
  true: () => t<true>("<<true>>"),
  false: () => t<false>("<<false>>"),
  undefined: () => t<undefined>("<<undefined>>"),
  startsWith: <T extends string>(startWith: T) => t<`${T}${string}`>(`<<startsWith:${startWith}>>`),
  endsWith: <T extends string>(endWith: T) => t<`${T}${string}`>(`<<startsWith:${endWith}>>`),
  null: () => "<null>" as unknown as null,
  literal: <T extends Narrowable[]>(...literals: T) => literals,
  union: <T extends readonly Narrowable[]>(...union: T) => `union:${union.join(",")}` as TupleToUnion<T>,
  explicitType: <T extends Narrowable>(typeName: `${UpperAlphaChar}${string}`) => t<T>(`<<explicitType:${typeName}>>`),
  timeInMinutes: <T extends TimeInMinutes>(time: T) => t<Time>(`<<time-in-minutes:${time}>>`),
  timeInSeconds: <T extends TimeInSeconds>(time: T) => t<Time>(`<<time-in-seconds:${time}>>`),
  militaryTime: <T extends MilitaryTime>(time: T) => t<Time>(`<<military-time:${time}>>`),
  civilianTime: <T extends CivilianTime>(time: T) => t<Time>(`<<civilian-time:${time}>>`),
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

