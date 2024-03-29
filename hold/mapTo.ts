/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FinalizedMapConfig,
  MapCardinalityIllustrated,
  MapperApi,
  MapTo,
  AsFinalizedConfig,
  MapConfig,
  ConfiguredMap,
  Mapper,
  MapFn,
  OptRequired,
  DefaultOneToManyMapping, 
  DEFAULT_MANY_TO_ONE_MAPPING, 
  DEFAULT_ONE_TO_MANY_MAPPING, 
  DEFAULT_ONE_TO_ONE_MAPPING 
} from "src/types/index";

import { createFnWithProps } from "src/runtime/index";

const debugMsg = <C extends FinalizedMapConfig<any, any, any>>(
  config: C,
  source: any,
  output: any
) => {
  if (config.debug) {
    console.error(
      `MapFn[${typeof config.output === "string" ? `${config.output}, ` : ""}${config.input}, ${
        config.cardinality
      }, ${config.output}] received:\n\n${JSON.stringify(source)}\n\nAnd produced: ${JSON.stringify(
        output
      )}\n\n`
    );
  }
};

/**
 * The single implementation for all mapping
 */
const mapper =
  <
    //
    C extends FinalizedMapConfig<
      OptRequired, //
      MapCardinalityIllustrated,
      OptRequired
    >
  >(
    config: C
  ) =>
  <I, O>(map: MapTo<I, O, C>): Mapper<I, O, C> => {
    const fn: MapFn<I, O, C> = <S>(source: S) => {
      /**
       * Determine whether input is an array
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
        const output = (source as any).flatMap(map);
        debugMsg(config, source, output);

        return output;
      } else {
        // receive _all_ inputs provided as pass into ; this is just a single input unless the
        // cardinality is
        const output = map(source as any);
        debugMsg(config, source, output);

        return output;
      }
    };

    const dict = {
      input: config.input,
      output: config.output,
      cardinality: config.cardinality,
      debug: config.debug,
      inputType: {} as I,
      outputType: {} as O,
      fnSignature: null as unknown as MapFn<I, O, C>,
    };

    return createFnWithProps(fn,dict);
  };

/**
 * Takes a userland configuration and a default configuration and then produces
 * the appropriately typed `ConfiguredMap` API surface.
 */
const setMapper = <
  U extends MapConfig<
    OptRequired,
    MapCardinalityIllustrated,
    OptRequired
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
  debug: config?.debug || false,
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
  config(_config) {
    // const c = { ...DEFAULT_ONE_TO_MANY_MAPPING, ...config };
    // TODO: re-introduce return type once project transpiling
    // return setMapper(c, DEFAULT_ONE_TO_MANY_MAPPING);
    throw new Error("ONE_TO_MANY is not implemented temporarily");
  },
  oneToOne(_config) {
    // const c = { ...DEFAULT_ONE_TO_ONE_MAPPING, ...config };
    // TODO: re-introduce return type once project transpiling
    // return setMapper(c, DEFAULT_ONE_TO_ONE_MAPPING);
    throw new Error("ONE_TO_ONE is not implemented temporarily");
  },
  manyToOne(_config) {
    // const c = { ...DEFAULT_MANY_TO_ONE_MAPPING, ...config };
    // return setMapper(c, DEFAULT_MANY_TO_ONE_MAPPING);
    throw new Error("MANY_TO_ONE is not implemented temporarily");

  },
  oneToMany(_config) {

    // const c = { ...DEFAULT_ONE_TO_MANY_MAPPING, ...config };
    // return setMapper(c, DEFAULT_ONE_TO_MANY_MAPPING);
    throw new Error("ONE_TO_MANY is not implemented temporarily");
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
export const mapTo = createFnWithProps(mapToFn,mapToDict);
