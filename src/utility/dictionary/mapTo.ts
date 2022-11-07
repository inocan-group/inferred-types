import {
  FinalizedMapConfig,
  MapCardinalityIllustrated,
  MapFnInput,
  MapperApi,
  MapTo,
  AsFinalizedConfig,
  MapConfig,
  ConfiguredMap,
  MapFnOutput,
  MapIR,
  MapCard,
  MapOR,
} from "src/types/dictionary";
import { OptRequired } from "src/types/literal-unions";
import { createFnWithProps } from "../createFnWithProps";

/**
 * utility function to take a fully-qualified _user_ config
 * and make it into a FinalizedMapConfig
 */
const toFinalizedConfig = <
  IR extends OptRequired,
  D extends MapCardinalityIllustrated,
  OR extends OptRequired
>(
  config: MapConfig<IR, D, OR>
) => {
  return { ...config, finalized: true } as FinalizedMapConfig<IR, D, OR>;
};

export const DEFAULT_ONE_TO_MANY_MAPPING = toFinalizedConfig({
  input: "req",
  output: "opt",
  cardinality: "I -> O[]",
});
export const DEFAULT_ONE_TO_ONE_MAPPING = toFinalizedConfig({
  input: "req",
  output: "req",
  cardinality: "I -> O",
});
export const DEFAULT_MANY_TO_ONE_MAPPING = toFinalizedConfig({
  input: "req",
  output: "req",
  cardinality: "I[] -> O",
});

export type DefaultOneToManyMapping = typeof DEFAULT_ONE_TO_MANY_MAPPING;
export type DefaultOneToOneMapping = typeof DEFAULT_ONE_TO_ONE_MAPPING;
export type DefaultManyToOneMapping = typeof DEFAULT_MANY_TO_ONE_MAPPING;

/**
 * The single implementation for all mapping
 */
const mapper =
  <C extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>>(config: C) =>
  <I, O>(map: MapTo<I, O, C>) => {
    return <S extends MapFnInput<I, MapIR<C>, MapCard<C>>>(
      source?: S
    ): MapFnOutput<I, O, S, MapOR<C>, MapCard<C>> => {
      /**
       * Determine whether input is an array; this will be true
       */
      const isArray =
        config.cardinality === "I -> O[]" && Array.isArray(source)
          ? true
          : config.cardinality === "I[] -> O" && Array.isArray(source) && Array.isArray(source[0])
          ? true
          : false;

      if (isArray) {
        // iterate over inputs with flatMap to return mapped values as
        // well as supporting filtering functionality. We could achieve
        // the same results by simply passing in all inputs to our mapper
        // in most cardinalities but when cardinality is M:1 we need to
        // make sure that the first array of elements is passed as a single
        // item and this approach achieves this.
        // TODO: we should check that the approach below doesn't work for M:1 here
        // as well
        return (source as any).flatMap(map) as MapFnOutput<I, O, S, MapOR<C>, MapCard<C>>;
      } else {
        // receive _all_ inputs provided as pass into ; this is just a single input unless the
        // cardinality is
        return map(source as any) as MapFnOutput<I, O, S, MapOR<C>, MapCard<C>>;
      }
    };
  };

/**
 * Takes a userland configuration and a default configuration and then produces
 * the appropriately typed `ConfiguredMap` API surface.
 */
const setMapper = <
  U extends MapConfig<
    OptRequired | undefined,
    MapCardinalityIllustrated | undefined,
    OptRequired | undefined
  >,
  D extends FinalizedMapConfig<OptRequired, MapCardinalityIllustrated, OptRequired>
>(
  config: U = { input: undefined, output: undefined, cardinality: undefined } as U,
  defaultValue: D
): ConfiguredMap<AsFinalizedConfig<U, D>> => ({
  map: (source) => {
    // merge userland config with defaults for a cardinality
    const c = {
      ...defaultValue,
      ...config,
    } as unknown as AsFinalizedConfig<U, D>;
    return mapper(c)(source);
  },
  input: config?.input || defaultValue.input,
  output: config?.output || defaultValue.output,
  cardinality: config?.cardinality || defaultValue.cardinality,
});

/**
 * **mapTo** _utility_
 *
 * This utility -- by default -- creates a strongly typed 1:M data mapper which maps from one
 * known source `I` to any array of another `O[]`:
 * ```ts
 * const mapper = mapTo<I, O>(i => [{
 *    foo: i.bar
 * }]);
 * ```
 */
export const mapToFn: ConfiguredMap<DefaultOneToManyMapping>["map"] = (map) => {
  return mapper(DEFAULT_ONE_TO_MANY_MAPPING)(map);
};

/**
 * Provides a `config` method which allows the relationships between _inputs_
 * and _outputs_ to be configured.
 */
export const mapToDict: MapperApi = {
  config(config) {
    const c = { ...DEFAULT_ONE_TO_MANY_MAPPING, ...config };
    return setMapper(c, DEFAULT_ONE_TO_MANY_MAPPING);
  },
  oneToOne(config) {
    const c = { ...DEFAULT_ONE_TO_ONE_MAPPING, ...config };
    return setMapper(c, DEFAULT_ONE_TO_ONE_MAPPING);
  },
  manyToOne(config) {
    const c = { ...DEFAULT_MANY_TO_ONE_MAPPING, ...config };
    return setMapper(c, DEFAULT_MANY_TO_ONE_MAPPING);
  },
  oneToMany(config) {
    const c = { ...DEFAULT_ONE_TO_MANY_MAPPING, ...config };
    return setMapper(c, DEFAULT_ONE_TO_MANY_MAPPING);
  },
};

/**
 * **mapTo** _utility_
 *
 * This utility creates a strongly typed data mapper which maps from one
 * known source `I` to another `O`.
 *
 * Signatures:
 * ```ts
 * const defMap = mapTo<I,O>( ... );
 * const configured = mapTo.config({ output: "req" }).map<I,O>( ... );
 * const one2one = mapTo.oneToOne().map<I,O>( ... );
 * const many2one = mapTo.manyToOne().map<I,O>( ... );
 * ```
 */
export const mapTo = createFnWithProps(mapToFn, mapToDict);
