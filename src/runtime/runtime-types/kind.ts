import {  
  Narrowable, 
  TimeInMinutes, 
  TupleToUnion, 
  TypeToken, 
  UpperAlphaChar ,
  Tuple,
  Time,
  AnyObject,
  IfTrue,
  IfFalse,
  CamelCase,
  EmptyObject,
  AnyFunction,
} from "src/types";
import { asArray, ifLength, ifUndefined, isTrue, toCamelCase } from "src/runtime";

const t = <T extends Narrowable | Tuple>(token: TypeToken) => {
  return token as unknown as T;
};

/**
 * encodes all CSV values to ensure that the `,` character is
 * replaced with `&comma;` placeholder
 */
export function encodeCsvValue<T extends string>(input: T) {
  return input.replace(/\,/g, "&comma;");
}

/**
 * decodes all CSV values to ensure that the `&comma;` placeholder
 * value is converted back to an actual `,` character
 */
export function decodeCsvValue<T extends string>(input: T) {
  return input.replace(/&comma;/g, ",");
}

/**
 * **kind** 
 * 
 * An API surface for creating a `TypeToken` for the runtime and the represented _type_
 * to the type system.
 * 
 * ### Example
 * ```ts
 * const val: string = kind.string(); // type system sees a string
 * if (isTypeToken(val)) {
 *    // this type guard will PASS and transform the type
 *    // of `val` to it's actual runtime value of `<<string>>`
 * }
 * ```
 */
export const kind =  {
  /**
   * **string**(_literals_)
   * 
   * create a wide `string` type or add parameters to create a string literal
   * or a union of string literals.
   */
  string
    <T extends readonly string[]>(...literals: T) {
      return ifLength(
        asArray(literals), 0,
        () => t<string>("<<string>>"), 
        () => t<TupleToUnion<T>>(`<<stringLiteral:${literals.map(encodeCsvValue).join(",")}>>`)
      ); 
  },
  /** 
   * **number**(_literals_)
   * 
   * create a token for a wide `number` type or add parameters to create a 
   * numeric literal or union of numeric literals.
   */
  number
    <T extends readonly number[]>(...literals: T) { 
    return ifLength(
      asArray(literals), 0,
      () => t<number>("<<number>>"), 
      () => t<TupleToUnion<T>>(`<<numericLiteral:${literals.join(",")}>>`)
    );
  },  
  
  /** 
   * **numericString**()
   * 
   * create a token for a numeric value wrapped as a string literal (`${number}`) 
   */
  numericString() { return t<`${number}`>("<<numericString>>"); },
  /**
   * call with no params for wide `boolean` type, add `true` or `false` as param
   * to narrow.
   */
  boolean: <T extends boolean | undefined>(literal: T = undefined as T) => 
    ifUndefined(
      literal,
      () => t<boolean>("<<boolean>>"), 
      () => (
        isTrue(literal)
        ? t<true>("<<true>>")
        : t<false>("<<false>>")
      ) 
    ) as IfTrue<T, true, IfFalse<T, false, boolean>>,

  /** 
   * **booleanString**()
   * 
   * create a token for a boolean value wrapped as a string literal (`${boolean}`) 
   */
  booleanString() { return  t<`${boolean}`>("<<booleanString>>"); },
  /**
   * returns a type of `AnyObject`
   */
  object() { return t<AnyObject>("<<object>>"); },
  objectLiteral<T extends AnyObject>(obj: T) { t<T>(`<<objectLiteral:${JSON.stringify(obj)}>>`); },

  emptyObject() { return t<EmptyObject>("<<emptyObject>>"); },

  function: () => t<AnyFunction>("<<function>>"),

  array: () => t<unknown[]>("<<array>>"),

  tuple<T extends readonly Narrowable[]>(...tuple: T) {
    return t<T>(`<<tuple:${JSON.stringify(tuple)}>>`);
  },
  /**
   * returns the _undefined_ type
   */
  undefined() { t<undefined>("<<undefined>>"); },
  null: () => "<null>" as unknown as null,
  literal: <T extends Narrowable[]>(...literals: T) => literals,
  union: <T extends readonly Narrowable[]>(...union: T) => `union:${union.join(",")}` as TupleToUnion<T>,
  explicitType: <T extends Narrowable>(typeName: `${UpperAlphaChar}${string}`) => t<T>(`<<explicitType:${typeName}>>`),
  timeInMinutes: <T extends TimeInMinutes>(time: T) => t<Time>(`<<timeInMinutes:${time}>>`),

  /**
   * a string type that _starts with_ an explicit string literal
   */
  startsWith: <T extends string>(startWith: T) => t<`${T}${string}`>(`<<startsWith:${startWith}>>`),
  /**
   * a string type that _ends with_ an explicit string literal
   */
  endsWith: <T extends string>(endWith: T) => t<`${string}${T}`>(`<<endsWith:${endWith}>>`),

  // TODO: rethink types like camelCase which cannot be statically typed
  // but instead require a type utility for verification
  /**
   * a string literal which conforms to the `camelCase` capitalization convention
   */
  camelCase 
    <T extends string>(v: CamelCase<T>) { 
      return t<CamelCase<T>>(`<<camelCase:${toCamelCase(v)}>>`);
    },
} as const;

/**
 * **RunType** API (aka, `type`)
 * 
 * Provides convenient way to create a type at runtime where the
 * type information is what's important. The type will be set but
 * the runtime value will be set to an appropriate `TypeToken` as
 * well.
 */
export type KindApi = typeof kind;

