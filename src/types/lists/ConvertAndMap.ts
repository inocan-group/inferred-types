import { TupleToUnion, UnionToTuple , Narrowable , Keys, WithoutValue, First, AfterFirst } from "src/types";


// [Mapped Tuple Types](https://github.com/Microsoft/TypeScript/issues/25947)

/**
 * The basic shape of a `Converter`
 */
export type ConverterShape<
  S extends Narrowable,
  N extends Narrowable,
  B extends Narrowable,
  O extends Narrowable
> = {
  string: <T extends string>(v: T) => S;
  number: <T extends number>(v: T) => N;
  boolean: <T extends boolean>(v: T) => B;
  object: <T extends Record<string, unknown>>(v: T) => O;
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

/**
 * **Converter**
 *
 * A type converter coming from the `createConverter()` utility. It receives
 * one or more broad types (e.g., number, string, etc.) -- what it can take
 * is based on what is configured -- and then converts based on the value
 * passed in.
 *
 * The primary goal is to preserve as many _narrow_ types as possible in this process.
 */
export type Converter<
  S extends Narrowable,
  N extends Narrowable,
  B extends Narrowable,
  O extends Narrowable
> = <T extends AvailableConverters<S, N, B, O>>(input: T) => ConverterShape<S, N, B, O>;

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
