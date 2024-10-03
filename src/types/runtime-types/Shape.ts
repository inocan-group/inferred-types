/* eslint-disable no-use-before-define */

import {
  If,
  Narrowable,
  ObjectKey,
  IsNever,
  IsTrue,
  TupleToUnion,
  IsFalse,
  Tuple,
  HandleDoneFn,
  AsLiteralFn,
  AsArray,
  ZipCode,
  MilitaryTime,
  TimeResolution,
  CivilianTime,
  Ip4Address,
  Ip6Address,
  Zip,
  ZipPlus4,
  As,
  Container,
  TypeTokenKind,
  Suggest,
  SimpleToken,
} from "src/types/index";
import { AsUnion, FromDefn } from "../literals/FromDefn";
import { FromWideTokens, WideContainerNames, WideTokenNames } from "../literals/FromTokenNames";

type Narrow = Exclude<Narrowable, symbol>;


/**
 * **Shape**
 *
 * This is a union type that captures all signatures of **shapes** which
 * are produced as the runtime representation of a type by utilities
 * like the `ShapeApi` and the `shape()` runtime function.
 */
export type Shape<T extends TypeTokenKind = TypeTokenKind> = `<<${T}${string}>>`

export type ShapeSuggest = Suggest<`<<${TypeTokenKind}>>`>


/**
 * **ShapeAddOrDone**`<TTuple, TMakeUnion>`
 *
 * The structure of endpoints on the `ShapeApi` which return
 * a tuple or union.
 */
export type ShapeTupleOrUnion<
  TTuple extends readonly Narrow[] = Narrow[],
  TMakeUnion extends boolean = boolean,
> = {
  add: <
    TAdd extends Narrow
  >(a: TAdd) => ShapeTupleOrUnion<[...TTuple, TAdd], TMakeUnion>;
  done: () => If<
    IsTrue<TMakeUnion>,
    TupleToUnion<TTuple>,
    TTuple
  >;
}

export type WideTypeName = "string" | "number" | "boolean" | "null" | "undefined" | "unknown" | "object";


export type StringTokenUtilities<T> = {
  /**
   * **numericString**
   *
   * A string type which holds numeric content (e.g., \`${number}\`)
   */
  numericString: () => `${number}`;
  /**
   * traditional 5 digit zip code (e.g., 90210)
   */
  zip: () => Zip;
  /**
   * A 5 digit code, a dash, and then a 4 digit code used for greater
   * geographic specificity. You can use the [melissa](https://lookups.melissa.com/home/zip4/zip4/)
   * API to see what 4 digit codes are available for a known base zip code.
   */
  zipPlus4: () => ZipPlus4;
  /**
   * **zipCode**
   *
   * A union type including both `zip` and `zipPlus4` patterns.
   */
  zipCode: () => ZipCode;
  /**
   * **militaryTime**
   *
   * Time based on a 24-hour military clock. You may optionally choose your time
   * resolution but the default is `HH:MM`; options are:
   *
   * - `HH:MM` - 12:49, 22:15, etc.
   * - `HH:MM:SS`
   * - `HH:MM:SS.ms`
   */
  militaryTime: <T extends TimeResolution="HH:MM">(resolution?: T) => MilitaryTime<T>;
  /**
   * **civilianTime**
   *
   * Time based on a 12-hour civilian clock. You may optionally choose your time
   * resolution but the default is `HH:MM`; options are:
   *
   * - `HH:MM` - 9:45am, 3:45pm, etc.
   * - `HH:MM:SS`
   * - `HH:MM:SS.ms`
   */
  civilianTime: <T extends TimeResolution="HH:MM">(resolution?: T) => CivilianTime<T>;
  /**
   * **ipv4Address**
   *
   * A simple representation of a IPv4 address.
   */
  ipv4Address: () => Ip4Address;
  /**
   * **ipv6Address**
   *
   * A simple representation of a fully qualified Ip6Address.
   */
  ipv6Address: () => Ip6Address;

  /**
   * **regex**
   *
   * A regular expression which can act as a type validator during
   * runtime, along with a type pattern/representation that doesn't
   * overburden the type system while keeping the guard rails on.
   */
  regex: <
    TExp extends string | RegExp,
    TRep extends readonly SimpleToken[]
  >(re: TExp, ...representation: TRep) => unknown;

  done: () => T;
}


export type ShapeApi__Scalars<
  TUnion = never,
  TExclude extends string = ""
> = Omit<{
  /**
   * **string**(_literals_)
   *
   * When called with:
   *
   * - **no parameters** sets the type to `string`
   *   - you may also choose other well known string literal patterns off an extended API
   *     when you initially call with no params
   * - **one parameter** makes it a _string literal_
   * - **more than one** parameter results in a _union type_ of string literals.
   */
  string: (<T extends readonly string[]>(...literals: T) => T["length"] extends 0
    ? StringTokenUtilities<string>
    : T["length"] extends 1
      ? T[0]
      : TupleToUnion<T>);
  /**
   * **number**(_literals_)
   *
   * When called with:
   *
   * - **no parameters** sets the type to `number`
   * - **one parameter** makes it a _numeric literal_
   * - **more than one** parameter results in a _union type_ of numeric literals.
   */
  number: <T extends readonly number[]>(...literals: T) => T["length"] extends 0
  ? number
  : T["length"] extends 1
    ? T[0]
    : TupleToUnion<T>;
  /**
   * **boolean**(_literal_)
   *
   * When called with _no_ parameters it results in a `boolean` type; however
   * you may add `true` or `false` into the call signature to make it a literal.
   */
  boolean: <L extends boolean>(v?: L) => If<
    IsTrue<L>,
    true,
    If<IsFalse<L>, false, boolean>
  >;
  /**
   * **null**()
   *
   * Set as a `null` value.
   */
  null: () => If<IsNever<TUnion>, null, null | TUnion>;
  /**
   * **undefined**()
   *
   * Set as a `undefined` value.
   */
  undefined: () => If<IsNever<TUnion>, undefined, undefined | TUnion>;
  /**
   * **unknown**()
   *
   * Set as an `unknown` value.
   */
  unknown: () => If<IsNever<TUnion>, unknown, unknown | TUnion>;
}, TExclude>



export type UnionElDefn = ShapeCallback | Tuple;

type ShapeApi__Union = {
  union: <U extends readonly [UnionElDefn,...UnionElDefn[]]>(...elements: U) => AsUnion<U>;
}

export type DictionaryTypeDefn = Record<ObjectKey, ShapeCallback>;


/**
 * **FnArgsDefn**
 *
 * The definition of a function's argument
 */
export type FnArgsDefn = ShapeCallback | WideContainerNames;

/**
 * **FnReturnTypeDefn**
 *
 * The definition of _return type_ of a function
 */
export type FnReturnTypeDefn = WideTokenNames | ShapeCallback;

/**
 * **FnPropertiesDefn**
 *
 * The definition of the _optional_ properties associated with a function.
 */
export type FnPropertiesDefn = DictionaryTypeDefn;

type ShapeApi__Functions = {
  fn: <TArgs extends readonly FnArgsDefn[]>(...args: TArgs) =>({
        returns: <TReturn extends FnReturnTypeDefn>(rtn: TReturn) => ({
          addProperties: <
            TProps extends FnPropertiesDefn
            >(kv: TProps) => AsLiteralFn<
              FromWideTokens<TArgs, FromDefn<TArgs>>,
              FromWideTokens<TReturn, FromDefn<TReturn>>,
              FromDefn<TProps>
            >;
            done: () => AsLiteralFn<
              FromDefn<TArgs>,
              FromDefn<TReturn>
            >;
          });
        done: () => AsLiteralFn<FromDefn<TArgs>>;
      });
};

export type RecordKeyWideTokens = "string" | "symbol" | "string | symbol";

export type RecordKeyDefn = RecordKeyWideTokens | ShapeCallback

export type FromRecordKeyDefn<
  T extends RecordKeyDefn
> = T extends ShapeCallback
? HandleDoneFn<ReturnType<T>>
: T extends "string"
  ? string
  : T extends "symbol"
  ? symbol
  : T extends "string | symbol"
  ? string | symbol
  : never;



/**
 * An input type for defining an object's "key".
 *
 * Note: use of `FromDefn<T>` will translate this into the actual key value.
 */
export type ObjKeyDefn = RecordKeyWideTokens | ShapeCallback;

export type ArrayTypeDefn = "string[]" | "number[]" | "boolean[]" | "unknown[]" | ShapeCallback;

export type RecordValueTypeDefn = ShapeCallback | WideTokenNames;

export type MapKeyDefn = ShapeCallback | WideTokenNames;
export type MapValueDefn = ShapeCallback | WideTokenNames;

export type WeakMapKeyDefn = WideContainerNames | ShapeCallback;
export type WeakMapValueDefn = ShapeCallback | WideTokenNames;

type ShapeApi__WideContainers = {
  record: <
    TKey extends ObjKeyDefn = "string | symbol",
    TValue extends RecordValueTypeDefn = "unknown"
  >(key?: TKey, value?: TValue) => Record<FromDefn<TKey>, FromDefn<TValue>>;
  array: <T extends ArrayTypeDefn = "unknown[]">(
    type?: T
  ) => AsArray<FromDefn<T>>;
  set: <T extends WideTokenNames | ShapeCallback = "unknown">(type?: T) =>
    T extends ShapeCallback
      ? Set<HandleDoneFn<ReturnType<T>>>
      : T extends WideTokenNames
        ? Set<FromDefn<T>>
        : Set<unknown>;
  map: <
    TKey extends MapKeyDefn = "unknown",
    TValue extends MapValueDefn = "unknown"
  >(key?: TKey, value?: TValue) => Map<FromDefn<TKey>, FromDefn<TValue>>;

  weakMap: <
    TKey extends WeakMapKeyDefn = "object",
    TValue extends WeakMapValueDefn = "unknown"
  >(key?: TKey, value?: TValue) => WeakMap<
    As<FromDefn<TKey>, Container>,
    FromDefn<TValue>
  >;
}

export type TupleDefn = WideTokenNames | ShapeCallback;

type ShapeApi__LiteralContainers = {
  dictionary: <T extends DictionaryTypeDefn>(obj: T) => FromDefn<T>;
  /**
   * **tuple**(el, el, ...)
   *
   * Allows the definition of a **tuple** by expressing each of the elements
   * in the tuple using the built-in "wide types" or with any type you need
   * using the callback api.
   *
   * ```ts
   * // [string, number, 42 | 56]
   * const tuple = 📦.tuple("string", "number", s => s.number(42,56))
   * ```
   */
  tuple: <T extends readonly TupleDefn[]>(...elements: T) => FromDefn<T>;
}


/**
 * The `ShapeApi` is an API surface for defining types which have a runtime aspect
 * to them as well.
 *
 * This is precisely what the `shape()` runtime utility exposes
 * but any function can add this -- typically by associating a property on a function
 * -- with the `ShapeCallback` type which simply gives this API to the caller of
 * the function.
 */
export type ShapeApi = ShapeApi__Scalars &
  ShapeApi__Union &
  ShapeApi__Functions &
  ShapeApi__WideContainers &
  ShapeApi__LiteralContainers;

/**
 * **ShapeCallback**
 *
 * This is a function signature for a property which you want to use
 * the `SharpApi` with to define types.
 */
export type ShapeCallback = (api: ShapeApi) => unknown;


export type ScalarCallback = (api: ShapeApi__Scalars & ShapeApi__Union) => unknown;


