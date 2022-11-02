import { OptRequired } from "src/types/literal-unions";

/**
 * Expresses relationship between inputs/outputs:
 *
 * - `I -> O[]` - every input results in 0:M outputs
 * - `I[] -> O` - ever input is an array of type I and reduced to a single O
 */
export type MapDirection = "I -> O[]" | "I[] -> O";

/**
 * **MapToWithFiltering**
 *
 * Maps from one type `I` to another `(O | null)[]`
 *
 * **Note:** because the output is an array you can easily support `1:1` and `1:M` mappings
 * and the allowance of the conversion to result in a `null` value also means that filter
 * out an input value entirely is possible. If you don't need _filtering_ then use the
 * `MapTo` type instead.
 */
export type MapToWithFiltering<I extends {}, O extends {}> = (i: I) => O[] | null;

export type MapperCardinalityOut = "0:1" | "1:1" | "0:M" | "1:M" | "M:1" | "M:0";
export type MapperCardinalityIn = "0:1" | "1:1" | "0:M" | "1:M" | "M:M";

// export type MapperRtn<O, CO extends MapperCardinalityOut = "0:M"> = CardinalityIn<CO> extends "0"
//   ? // can filter output to no output
//     CardinalityOut<CO> extends "1"
//     ? O | undefined // O:1
//     : O[] // O:M
//   : // must return at least one
//   CardinalityIn<CO> extends "1"
//   ? CardinalityOut<CO> extends "1"
//     ? O // 1:1
//     : [O] | [O, ...O[]] // 1:M
//   : // must return at least one
//   CardinalityIn<CO> extends "M"
//   ? CardinalityOut<CO> extends "1"
//     ? O // M:1
//     : O | undefined // M:0
//   : never;

export type MapInput<I, IR, D extends MapDirection> = D extends "I -> O[]"
  ? IR extends "opt"
    ? I | undefined
    : I
  : IR extends "opt"
  ? I[] | undefined
  : I[];

export type MapOutput<O, OR, D extends MapDirection> = D extends "I -> O[]"
  ? OR extends "opt"
    ? O[]
    : [O, ...O[]]
  : // I[] -> O
  OR extends "opt"
  ? O | null
  : O;

/**
 * **MapTo<I, O>**
 *
 * A mapping function between an input type `I` and output type `O`.
 *
 * **Note:** this type is designed to guide the userland mapping; refer
 * to `MapFn` if you want the type output by the `mapFn()` utility.
 */
export type MapTo<
  I,
  O,
  IR extends OptRequired = "req",
  D extends MapDirection = "I -> O[]",
  OR extends OptRequired = "opt"
> = IR extends "opt"
  ? (source?: MapInput<I, IR, D>) => MapOutput<O, OR, D>
  : (source: MapInput<I, IR, D>) => MapOutput<O, OR, D>;

export type MapFnOutput<
  I,
  O,
  S,
  OR extends OptRequired,
  D extends MapDirection
> = D extends "I -> O[]"
  ? OR extends "opt"
    ? S extends I[]
      ? O[]
      : O | null
    : S extends I[]
    ? [O, ...O[]]
    : O
  : // I[] -> O
  OR extends "opt"
  ? S extends I[][]
    ? O[]
    : O | null
  : S extends I[][]
  ? [O, ...O[]]
  : O;

export type MapFnInput<I, IR extends OptRequired, D extends MapDirection> = D extends "I -> O[]"
  ? IR extends "opt"
    ? I | I[] | undefined
    : I | I[]
  : IR extends "opt"
  ? I[] | I[][] | undefined
  : I[] | I[][];

/**
 * The mapping function provided by the `mapFn()` utility. This _fn_
 * is intended to be used in two ways:
 *
 * 1. Iterative:
 *    ```ts
 *    const m = mapTo<I,O>(i => [ ... ]);
 *    // maps inputs to outputs
 *    const out = inputs.map(m);
 *    ```
 * 2. Block:
 *    ```ts
 *    // maps inputs to outputs (filtering or splitting where approp)
 *    const out2 = m(inputs);
 *    ```
 */
export type MapFn<
  I,
  O,
  IR extends OptRequired = "req",
  D extends MapDirection = "I -> O[]",
  OR extends OptRequired = "opt"
> = IR extends "opt"
  ? <S extends MapFnInput<I, IR, D>>(source?: S) => MapFnOutput<I, O, S, OR, D>
  : <S extends MapFnInput<I, IR, D>>(source: S) => MapFnOutput<I, O, S, OR, D>;
