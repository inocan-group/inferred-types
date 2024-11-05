import { TupleToUnion, UnionToTuple , Narrowable , Keys, WithoutValue, First, AfterFirst, AnyObject, Tuple, Nothing } from "inferred-types/dist/types/index";


// [Mapped Tuple Types](https://github.com/Microsoft/TypeScript/issues/25947)

/**
 * **ConverterDefn**`<TStr,TNum,TBool,TObj,TTuple,TNothing>`
 *
 * A conversion definition which has wide types for keys and
 * callback functions to call when a particular type is provided
 * as input.
 */
export type ConverterDefn<
  TStr,
  TNum,
  TBool,
  TObj,
  TTuple,
  TNothing
> = {
  string: <T extends string>(v: T) => TStr;
  number: <T extends number>(v: T) => TNum;
  boolean: <T extends boolean>(v: T) => TBool;
  object: <T extends AnyObject>(v: T) => TObj;
  tuple: <T extends Tuple>(v: T) => TTuple;
  nothing: <T extends Nothing>(v: T) => TNothing;
};

type ConverterKeys<S, N, B, O> = UnionToTuple<
  Keys<
    WithoutValue<
      {
        string: S;
        number: N;
        boolean: B;
        object: O;
      },
      undefined
    >
  >
>;

type ConverterInputType<T extends string> = T extends "string"
  ? string
  : T extends "number"
  ? number
  : T extends "boolean"
  ? boolean
  : T extends "object"
  ? Record<string, unknown>
  : unknown;

type ConverterInputUnion<
  TConverted extends readonly unknown[],
  TRemaining extends readonly string[]
> = [] extends TRemaining
  ? // we're done iterating
    TConverted
  : // recurse
    ConverterInputUnion<
      [...TConverted, ConverterInputType<First<TRemaining>>],
      AfterFirst<TRemaining>
    >;

/**
 * **AvailableConverters**
 *
 * Type utility which will produce the correct union type for a "converter"
 */
export type AvailableConverters<S, N, B, O> = ConverterKeys<S, N, B, O> extends readonly string[]
  ? TupleToUnion<ConverterInputUnion<[], ConverterKeys<S, N, B, O>>>
  : never;

export type Conversion<TInput extends Narrowable, TOutput extends Narrowable> = <T extends TInput>(
  input: T
) => TOutput;

export type ConverterCoverage = "string" | "number" | "boolean" | "object";

/**
 * Extracts the coverage provided by a `StrongMap` as a Tuple
 */
// eslint-disable-next-line no-use-before-define
export type MapCoverage<T extends StrongMap<ConverterCoverage>> = T extends StrongMap<
  infer Coverage
>
  ? UnionToTuple<Coverage>
  : never;

export type StrongMapTypes<K extends readonly unknown[]> = [] extends K
  ? never
  : TupleToUnion<
      [
        First<K> extends "string"
          ? TupleToUnion<[string, ...UnionToTuple<StrongMapTypes<AfterFirst<K>>>]>
          : First<K> extends "number"
          ? TupleToUnion<[number, ...UnionToTuple<StrongMapTypes<AfterFirst<K>>>]>
          : First<K> extends "boolean"
          ? TupleToUnion<[boolean, ...UnionToTuple<StrongMapTypes<AfterFirst<K>>>]>
          : First<K> extends "object"
          ? TupleToUnion<[Record<string, unknown>, ...UnionToTuple<StrongMapTypes<AfterFirst<K>>>]>
          : never,
        ...UnionToTuple<StrongMapTypes<AfterFirst<K>>>
      ]
    >;

export type StrongMap<TDefined = ConverterCoverage> = {
  string: TDefined extends "string" ? <T extends string, R>(v: T) => R : never;
  number: TDefined extends "number" ? <T extends number, R>(v: T) => R : never;
  boolean: TDefined extends "boolean" ? <T extends boolean, R >(v: T) => R : never;
  object: TDefined extends "object"
    ? <T extends Record<string, unknown>, R >(v: T) => R
    : never;
};

export type StrongMapTransformer<M extends StrongMap> = <
  T extends readonly StrongMapTypes<MapCoverage<M>>[]
>(
  tuple: T
) => {
  [K in keyof T]: T[K] extends string
    ? M["string"] extends (...args: unknown[]) => unknown
      ? ReturnType<M["string"]>
      : never
    : T[K] extends number
    ? M["number"] extends (...args: unknown[]) => unknown
      ? ReturnType<M["number"]>
      : never
    : T[K] extends boolean
    ? M["boolean"] extends (...args: unknown[]) => unknown
      ? ReturnType<M["boolean"]>
      : never
    : T[K] extends Record<string, unknown>
    ? M["object"] extends (...args: unknown[]) => unknown
      ? ReturnType<M["object"]>
      : never
    : never;
}[keyof T];
