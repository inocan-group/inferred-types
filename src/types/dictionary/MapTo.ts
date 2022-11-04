/* eslint-disable no-use-before-define */
import { OptRequired } from "src/types/literal-unions";
import {
  DEFAULT_MANY_TO_ONE_MAPPING,
  DEFAULT_ONE_TO_MANY_MAPPING,
  DEFAULT_ONE_TO_ONE_MAPPING,
} from "src/utility/dictionary/mapTo";
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

/**
 * The _user_ configuration of a **mapTo** mapper function
 * which will be finalized by merging it with the appropriate
 * default mapping type.
 */
export interface MapConfig<
  IR extends OptRequired | undefined = undefined,
  D extends MapDirectionVal | undefined = undefined,
  OR extends OptRequired | undefined = undefined
> {
  input?: IR;
  output?: OR;
  direction?: D;
}

/**
 * A finalized configuration of a **mapTo** mapper functions cardinality
 * relationships between _inputs_ and _outputs_
 */
export type FinalizedMapConfig<
  IR extends OptRequired,
  D extends MapDirectionVal,
  OR extends OptRequired
> = Required<MapConfig<IR, D, OR>> & { finalized: true };

/**
 * Provides a mapper function using the default configuration
 */
export type MapperApiDefault = <I, O>(map: MapTo<I, O>) => MapFn<I, O>;

type MapCardinalityConfig<
  IR extends OptRequired | undefined,
  OR extends OptRequired | undefined
> = {
  input?: IR;
  output?: OR;
};

/**
 * **ConfiguredMap**
 *
 * A partial application of the mapTo() utility which has expressed the
 * configuration of the _inputs_ and _outputs_ of the mapping but has not
 * yet defined the actual mapping.
 */
export type ConfiguredMap<
  IR extends OptRequired,
  D extends MapDirectionVal,
  OR extends OptRequired
> = {
  map: <I, O>(map: MapTo<I, O, IR, D, OR>) => MapFn<I, O, IR, D, OR>;
  input: IR;
  output: OR;
  cardinality: D;
};

/**
 * Takes a type `T` which _might_ be undefined and a default type `D` which
 * is assured _not_ be undefined and combines the types to preserve the default
 * type when the `T` is undefined.
 */
export type TypeWithDefault<T, D> = T extends undefined ? D : T;

export type DecomposeMapConfig<
  M extends
    | MapConfig<OptRequired | undefined, MapDirectionVal | undefined, OptRequired | undefined>
    | FinalizedMapConfig<OptRequired, MapDirectionVal, OptRequired>
> = M extends MapConfig<infer IR, infer D, infer OR>
  ? IR extends OptRequired | undefined
    ? D extends MapDirectionVal | undefined
      ? OR extends OptRequired | undefined
        ? [IR, D, OR]
        : never
      : never
    : never
  : M extends FinalizedMapConfig<infer IR, infer D, infer OR>
  ? IR extends OptRequired
    ? D extends MapDirectionVal
      ? OR extends OptRequired
        ? [IR, D, OR]
        : never
      : never
    : never
  : never;

/**
 * Merges the types of a userland configuration with a default configuration
 */
export type ToFinalizedConfig<
  U extends MapConfig<
    OptRequired | undefined,
    MapDirectionVal | undefined,
    OptRequired | undefined
  >,
  D extends FinalizedMapConfig<OptRequired, MapDirectionVal, OptRequired>
> = FinalizedMapConfig<
  TypeWithDefault<DecomposeMapConfig<U>[0], DecomposeMapConfig<D>[0]>,
  TypeWithDefault<DecomposeMapConfig<U>[1], DecomposeMapConfig<D>[1]>,
  TypeWithDefault<DecomposeMapConfig<U>[2], DecomposeMapConfig<D>[2]>
>;

/**
 * Type utility which receives both a user config and a default config
 * and merges into the appropriate `ConfiguredMap` API
 */
export type ToConfiguredMap<
  U extends MapConfig<
    OptRequired | undefined,
    MapDirectionVal | undefined,
    OptRequired | undefined
  >,
  D extends FinalizedMapConfig<OptRequired, MapDirectionVal, OptRequired>
> = ConfiguredMap<
  TypeWithDefault<DecomposeMapConfig<U>[0], DecomposeMapConfig<D>[0]>,
  TypeWithDefault<DecomposeMapConfig<U>[1], DecomposeMapConfig<D>[1]>,
  TypeWithDefault<DecomposeMapConfig<U>[2], DecomposeMapConfig<D>[2]>
>;

export type MapperApi = {
  /**
   * Provides opportunity to configure _input_, _output_, and _cardinality_
   * prior to providing a mapping function.
   *
   * Note: _the defaults for configuration are defined by the_ `DEFAULT_ONE_TO_MANY_MAPPING`
   * _constant made available as a symbol from this library._
   */
  config: <
    IR extends OptRequired | undefined,
    D extends MapDirectionVal | undefined,
    OR extends OptRequired | undefined
  >(
    config: MapConfig<IR, D, OR>
  ) => ToConfiguredMap<
    MapConfig<IR, D, OR>, //
    typeof DEFAULT_ONE_TO_MANY_MAPPING
  >;

  /**
   * Provides a nice 1:1 ratio between the input and output.
   *
   * By default the input and output are considered to be _required_
   * properties but this can be changed with the options hash provided.
   * ```ts
   * const mapper = mapTo.oneToOne().map(...);
   * // add in ability to filter out some inputs
   * const mapAndFilter = mapTo.oneToOne({ output: "opt" })
   * ```
   */
  oneToOne: <IR extends OptRequired | undefined, OR extends OptRequired | undefined>(
    config?: MapCardinalityConfig<IR, OR>
  ) => ToConfiguredMap<
    MapConfig<IR, undefined, OR>, //
    typeof DEFAULT_ONE_TO_ONE_MAPPING
  >;

  /**
   * **manyToOne** _mapping_
   *
   * Provides a configuration where multiple inputs `I[]` will be mapped to a
   * single output `O`.
   *
   * Choosing this configuration will, by default, set both input and output
   * to be "required" but you can change this default if you so choose.
   */
  manyToOne: <IR extends OptRequired = "req", OR extends OptRequired = "req">(
    config?: MapCardinalityConfig<IR, OR>
  ) => ToConfiguredMap<
    MapConfig<IR, undefined, OR>, //
    typeof DEFAULT_MANY_TO_ONE_MAPPING
  >;
};

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
 *    // maps inputs to outputs (filtering or splitting where appr.)
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
