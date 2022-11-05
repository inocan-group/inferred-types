/* eslint-disable no-use-before-define */
import { OptRequired } from "src/types/literal-unions";
import {
  DEFAULT_MANY_TO_ONE_MAPPING,
  DEFAULT_ONE_TO_MANY_MAPPING,
  DEFAULT_ONE_TO_ONE_MAPPING,
} from "src/utility/dictionary/mapTo";
import { EnumValues } from "../EnumValues";
import { TypeDefault } from "../TypeInfo/TypeDefault";

/**
 * Expresses relationship between inputs/outputs:
 */
export enum MapCardinality {
  /** every input results in 0:M outputs */
  OneToMany = "I -> O[]",
  /** every input results in 0:1 outputs */
  OneToOne = "I -> O",
  /** every input is an array of type I and reduced to a single O  */
  ManyToOne = "I[] -> O",
}

export type MapCardinalityIllustrated = EnumValues<MapCardinality>;

/**
 * The _user_ configuration of a **mapTo** mapper function
 * which will be finalized by merging it with the appropriate
 * default mapping type.
 */
export interface MapConfig<
  IR extends OptRequired | undefined = undefined,
  D extends MapCardinalityIllustrated | undefined = undefined,
  OR extends OptRequired | undefined = undefined
> {
  input?: IR;
  output?: OR;
  cardinality?: D;
}

/**
 * A finalized configuration of a **mapTo** mapper functions cardinality
 * relationships between _inputs_ and _outputs_
 */
export type FinalizedMapConfig<
  IR extends OptRequired,
  D extends MapCardinalityIllustrated,
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
 * Internal type util which receives a finalized map config and returns a
 * `ConfiguredMap` API surface.
 */
export type ConfigureMap<
  C extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = (config: C) => ConfiguredMap<C>;

/**
 * **ConfiguredMap**
 *
 * A partial application of the mapTo() utility which has expressed the
 * configuration of the _inputs_ and _outputs_ and provides a `.map()`
 * method which allows the user configure the specifics of the mapping.
 */
export type ConfiguredMap<
  C extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = {
  map: <I, O>(
    map: MapTo<
      I,
      O,
      DecomposeMapConfig<C>[0], //
      DecomposeMapConfig<C>[1],
      DecomposeMapConfig<C>[2]
    >
  ) => MapFn<
    I,
    O,
    DecomposeMapConfig<C>[0], //
    DecomposeMapConfig<C>[1],
    DecomposeMapConfig<C>[2]
  >;
  input: DecomposeMapConfig<C>[0];
  cardinality: DecomposeMapConfig<C>[1];
  output: DecomposeMapConfig<C>[2];
};

export type DecomposeMapConfig<
  M extends
    | MapConfig<
        OptRequired | undefined,
        MapCardinalityIllustrated | undefined,
        OptRequired | undefined
      >
    | FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = M extends MapConfig<infer IR, infer D, infer OR>
  ? IR extends OptRequired | undefined
    ? D extends MapCardinalityIllustrated | undefined
      ? OR extends OptRequired | undefined
        ? [IR, D, OR]
        : never
      : never
    : never
  : M extends FinalizedMapConfig<infer IR, infer D, infer OR>
  ? IR extends OptRequired
    ? D extends MapCardinalityIllustrated
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
    MapCardinalityIllustrated | undefined,
    OptRequired | undefined
  >,
  D extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = TypeDefault<U, D>;

/**
 * Type utility which receives both a user config and a default config
 * and merges into the appropriate `ConfiguredMap` API
 */
export type ToConfiguredMap<
  U extends MapConfig<
    OptRequired | undefined,
    MapCardinalityIllustrated | undefined,
    OptRequired | undefined
  >,
  D extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = ConfiguredMap<
  TypeDefault<DecomposeMapConfig<U>[0], DecomposeMapConfig<D>[0]>,
  TypeDefault<DecomposeMapConfig<U>[1], DecomposeMapConfig<D>[1]>,
  TypeDefault<DecomposeMapConfig<U>[2], DecomposeMapConfig<D>[2]>
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
    D extends MapCardinalityIllustrated | undefined,
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

export type MapInput<I, IR, D extends MapCardinalityIllustrated> = D extends
  | MapCardinality.OneToMany
  | "I -> O[]"
  ? IR extends "opt"
    ? I | undefined
    : I
  : D extends MapCardinality.OneToOne | "I -> O"
  ? IR extends "opt"
    ? I | undefined
    : I
  : D extends MapCardinality.ManyToOne | "I[] -> O"
  ? IR extends "opt"
    ? I[] | undefined
    : I[]
  : never;

export type MapOutput<O, OR, D extends MapCardinalityIllustrated> = D extends
  | MapCardinality.OneToMany
  | "I -> O[]"
  ? OR extends "opt"
    ? O[]
    : [O, ...O[]]
  : D extends MapCardinality.OneToOne | "I -> O"
  ? OR extends "opt"
    ? O | null
    : O
  : D extends MapCardinality.ManyToOne | "I[] -> O"
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
  D extends MapCardinalityIllustrated = MapCardinality.OneToMany,
  OR extends OptRequired = "opt"
> = IR extends "opt"
  ? (source?: MapInput<I, IR, D>) => MapOutput<O, OR, D>
  : (source: MapInput<I, IR, D>) => MapOutput<O, OR, D>;

export type MapFnOutput<
  I,
  O,
  S,
  OR extends OptRequired,
  D extends MapCardinalityIllustrated
> = D extends "I -> O[]" | MapCardinality.OneToMany
  ? S extends I[]
    ? OR extends "opt"
      ? O[]
      : [O, ...O[]]
    : OR extends "opt"
    ? O[] | null
    : O[]
  : D extends MapCardinality.OneToOne | "I -> O"
  ? S extends I[]
    ? OR extends "opt"
      ? O[]
      : [O, ...O[]]
    : OR extends "opt"
    ? O | null
    : O
  : D extends MapCardinality.ManyToOne | "I[] -> O"
  ? S extends I[][]
    ? OR extends "opt"
      ? O[]
      : [O, ...O[]]
    : OR extends "opt"
    ? O | null
    : O
  : never;

export type MapFnInput<I, IR extends OptRequired, D extends MapCardinalityIllustrated> = D extends
  | "I -> O[]"
  | MapCardinality.OneToMany
  ? IR extends "opt"
    ? I | I[] | undefined
    : I | I[]
  : D extends MapCardinality.OneToOne | "I -> O"
  ? IR extends "opt"
    ? I | I[] | undefined
    : I | I[]
  : D extends MapCardinality.ManyToOne | "I[] -> O"
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
  D extends MapCardinalityIllustrated = MapCardinality.OneToMany,
  OR extends OptRequired = "opt"
> = IR extends "opt"
  ? <S extends MapFnInput<I, IR, D>>(source?: S) => MapFnOutput<I, O, S, OR, D>
  : <S extends MapFnInput<I, IR, D>>(source: S) => MapFnOutput<I, O, S, OR, D>;
