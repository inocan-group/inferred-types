/* eslint-disable no-use-before-define */
import { OptRequired } from "src/types/literal-unions";
import {
  DefaultManyToOneMapping,
  DefaultOneToManyMapping,
  DefaultOneToOneMapping,
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
 * relationships between _inputs_ and _outputs_.
 *
 * Note: _this configuration does _not_ yet include the actual mapping
 * configuration between the input and output._
 */
export type FinalizedMapConfig<
  IR extends OptRequired = MapIR<DefaultOneToManyMapping>,
  D extends MapCardinalityIllustrated = MapCard<DefaultOneToManyMapping>,
  OR extends OptRequired = MapOR<DefaultOneToManyMapping>
> = Required<MapConfig<IR, D, OR>> & { finalized: true };

/**
 * User configuration exposed by a config function which specifies the
 * cardinality already (e.g., `oneToMany()`, `manyToOne()`)
 */
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
 * configuration of the _inputs_ and _outputs_ and provides a `.map()`
 * method which allows the user configure the specifics of the mapping.
 */
export type ConfiguredMap<
  C extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = {
  map: <I, O>(map: MapTo<I, O, C>) => MapFn<I, O, C>;
  input: MapIR<C>;
  cardinality: MapCard<C>;
  output: MapOR<C>;
};

/**
 * Extracts the IR, Cardinality, and OR generics from a FinalizedMapConfig
 */
export type DecomposeMapConfig<
  M extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
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

/** extracts IR from a `FinalizedMapConfig` */
export type MapIR<
  T extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = DecomposeMapConfig<T>[0];

/**
 * extracts the MapCardinality from a `FinalizedMapConfig`
 */
export type MapCard<
  T extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = DecomposeMapConfig<T>[1];

/** extracts OR from a `FinalizedMapConfig` */
export type MapOR<
  T extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = DecomposeMapConfig<T>[2];

/**
 * Merges the types of a userland configuration with a default configuration
 */
export type AsFinalizedConfig<
  U extends MapConfig<
    OptRequired | undefined,
    MapCardinalityIllustrated | undefined,
    OptRequired | undefined
  >,
  D extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = TypeDefault<U, D> extends FinalizedMapConfig<infer IR, infer C, infer OR>
  ? FinalizedMapConfig<IR, C, OR>
  : never;

export type MapperApi = {
  /**
   * Provides opportunity to configure _input_, _output_, and _cardinality_
   * prior to providing a mapping function.
   *
   * Note: _the defaults for configuration are defined by the_ `DEFAULT_ONE_TO_MANY_MAPPING`
   * _constant made available as a symbol from this library._
   */
  config: <
    C extends MapConfig<
      OptRequired, //
      MapCardinalityIllustrated,
      OptRequired
    >
  >(
    config: C
  ) => ConfiguredMap<
    AsFinalizedConfig<
      C, //
      DefaultOneToManyMapping
    >
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
  oneToOne: <C extends MapCardinalityConfig<OptRequired, OptRequired>>(
    config?: C
  ) => ConfiguredMap<
    AsFinalizedConfig<
      C, //
      DefaultOneToOneMapping
    >
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
  manyToOne: <
    C extends MapCardinalityConfig<
      OptRequired | undefined, //
      OptRequired | undefined
    >
  >(
    config?: C
  ) => ConfiguredMap<
    AsFinalizedConfig<
      C, //
      DefaultManyToOneMapping
    >
  >;

  oneToMany: <
    C extends MapCardinalityConfig<
      OptRequired | undefined, //
      OptRequired | undefined
    >
  >(
    config?: C
  ) => ConfiguredMap<
    AsFinalizedConfig<
      C, //
      DefaultOneToManyMapping
    >
  >;
};

export type MapInput<
  I, //
  IR extends OptRequired,
  C extends MapCardinalityIllustrated
> = C extends MapCardinality.OneToMany | "I -> O[]"
  ? IR extends "opt"
    ? I | undefined
    : I
  : C extends MapCardinality.OneToOne | "I -> O"
  ? IR extends "opt"
    ? I | undefined
    : I
  : C extends MapCardinality.ManyToOne | "I[] -> O"
  ? IR extends "opt"
    ? I[] | undefined
    : I[]
  : never;

export type MapOutput<
  O, //
  OR extends OptRequired,
  C extends MapCardinalityIllustrated
> = C extends MapCardinality.OneToMany | "I -> O[]"
  ? OR extends "opt"
    ? O[]
    : [O, ...O[]]
  : C extends MapCardinality.OneToOne | "I -> O"
  ? OR extends "opt"
    ? O | null
    : O
  : C extends MapCardinality.ManyToOne | "I[] -> O"
  ? OR extends "opt"
    ? O | null
    : O
  : never;

/**
 * **MapTo<I, O>**
 *
 * A mapping function between an input type `I` and output type `O`. Defaults to using
 * the _default_ OneToMany mapping config.
 *
 * **Note:** this type is designed to guide the userland mapping; refer
 * to `MapFn` if you want the type output by the `mapFn()` utility.
 */
export type MapTo<
  I,
  O,
  C extends FinalizedMapConfig<
    OptRequired,
    MapCardinalityIllustrated,
    OptRequired
  > = DefaultOneToManyMapping
> = MapIR<C> extends "opt"
  ? (source?: MapInput<I, MapIR<C>, MapCard<C>>) => MapOutput<O, MapOR<C>, MapCard<C>>
  : (source: MapInput<I, MapIR<C>, MapCard<C>>) => MapOutput<O, MapOR<C>, MapCard<C>>;

export type MapFnOutput<
  I,
  O,
  S,
  OR extends OptRequired,
  C extends MapCardinalityIllustrated
> = C extends "I -> O[]" | MapCardinality.OneToMany
  ? S extends I[]
    ? OR extends "opt"
      ? O[]
      : [O, ...O[]]
    : OR extends "opt"
    ? O[] | null
    : O[]
  : C extends MapCardinality.OneToOne | "I -> O"
  ? S extends I[]
    ? OR extends "opt"
      ? O[]
      : [O, ...O[]]
    : OR extends "opt"
    ? O | null
    : O
  : C extends MapCardinality.ManyToOne | "I[] -> O"
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
  C extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
> = MapIR<C> extends "opt"
  ? <S extends MapFnInput<I, MapIR<C>, MapCard<C>>>(
      source?: S
    ) => MapFnOutput<I, O, S, MapOR<C>, MapCard<C>>
  : <S extends MapFnInput<I, MapIR<C>, MapCard<C>>>(
      source: S
    ) => MapFnOutput<I, O, S, MapOR<C>, MapCard<C>>;
