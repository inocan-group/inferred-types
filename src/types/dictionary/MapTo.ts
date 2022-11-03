import { OptRequired } from "src/types/literal-unions";
import { EnumValues } from "../EnumValues";

/**
 * Expresses relationship between inputs/outputs:
 */
export enum MapDirection {
  /** every input results in 0:M outputs */
  OneToMany = "I -> O[]",
  /** every input results in 0:1 outputs */
  OneToOne = "I -> O",
  /** every input is an array of type I and reduced to a single O  */
  ManyToOne = "I[] -> O",
}

export type MapDirectionVal = EnumValues<MapDirection>;

export type MapInput<I, IR, D extends MapDirectionVal> = D extends
  | MapDirection.OneToMany
  | "I -> O[]"
  ? IR extends "opt"
    ? I | undefined
    : I
  : D extends MapDirection.OneToOne | "I -> O"
  ? IR extends "opt"
    ? I | undefined
    : I
  : D extends MapDirection.ManyToOne | "I[] -> O"
  ? IR extends "opt"
    ? I[] | undefined
    : I[]
  : never;

export type MapOutput<O, OR, D extends MapDirectionVal> = D extends
  | MapDirection.OneToMany
  | "I -> O[]"
  ? OR extends "opt"
    ? O[]
    : [O, ...O[]]
  : D extends MapDirection.OneToOne | "I -> O"
  ? OR extends "opt"
    ? O | null
    : O
  : D extends MapDirection.ManyToOne | "I[] -> O"
  ? OR extends "opt"
    ? O | null
    : O
  : never;

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
  D extends MapDirectionVal = MapDirection.OneToMany,
  OR extends OptRequired = "opt"
> = IR extends "opt"
  ? (source?: MapInput<I, IR, D>) => MapOutput<O, OR, D>
  : (source: MapInput<I, IR, D>) => MapOutput<O, OR, D>;

export type MapFnOutput<I, O, S, OR extends OptRequired, D extends MapDirectionVal> = D extends
  | "I -> O[]"
  | MapDirection.OneToMany
  ? S extends I[]
    ? OR extends "opt"
      ? O[]
      : [O, ...O[]]
    : OR extends "opt"
    ? O[] | null
    : O[]
  : D extends MapDirection.OneToOne | "I -> O"
  ? S extends I[]
    ? OR extends "opt"
      ? O[]
      : [O, ...O[]]
    : OR extends "opt"
    ? O | null
    : O
  : D extends MapDirection.ManyToOne | "I[] -> O"
  ? S extends I[][]
    ? OR extends "opt"
      ? O[]
      : [O, ...O[]]
    : OR extends "opt"
    ? O | null
    : O
  : never;

export type MapFnInput<I, IR extends OptRequired, D extends MapDirectionVal> = D extends
  | "I -> O[]"
  | MapDirection.OneToMany
  ? IR extends "opt"
    ? I | I[] | undefined
    : I | I[]
  : D extends MapDirection.OneToOne | "I -> O"
  ? IR extends "opt"
    ? I | I[] | undefined
    : I | I[]
  : D extends MapDirection.ManyToOne | "I[] -> O"
  ? IR extends "opt"
    ? I[] | I[][] | undefined
    : I[] | I[][]
  : never;

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
  D extends MapDirectionVal = MapDirection.OneToMany,
  OR extends OptRequired = "opt"
> = IR extends "opt"
  ? <S extends MapFnInput<I, IR, D>>(source?: S) => MapFnOutput<I, O, S, OR, D>
  : <S extends MapFnInput<I, IR, D>>(source: S) => MapFnOutput<I, O, S, OR, D>;
