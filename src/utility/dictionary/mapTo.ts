import { TypeDefault } from "src/types";
import {
  FinalizedMapConfig,
  MapCardinalityIllustrated,
  MapFn,
  MapFnInput,
  MapperApi,
  MapTo,
  ToConfiguredMap,
  ToFinalizedConfig,
  MapConfig,
  ConfiguredMap,
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
  cardinality: "I -> O[]",
});
export const DEFAULT_MANY_TO_ONE_MAPPING = toFinalizedConfig({
  input: "req",
  output: "req",
  cardinality: "I[] -> O",
});

/**
 * The single implementation for all mapping
 */
const mapper =
  <IR extends OptRequired, D extends MapCardinalityIllustrated, OR extends OptRequired>(
    config: FinalizedMapConfig<IR, D, OR>
  ) =>
  <I, O>(map: MapTo<I, O, IR, D, OR>) => {
    const fn = <S extends MapFnInput<I, IR, D>>(source?: S) => {
      const isArray =
        config.cardinality === "I -> O[]" && Array.isArray(source)
          ? true
          : config.cardinality === "I[] -> O" && Array.isArray(source) && Array.isArray(source[0])
          ? true
          : false;

      if (isArray) {
        return (source as any).flatMap(map);
      } else {
        return map(source as any);
      }
    };

    return fn as unknown as MapFn<I, O, IR, D, OR>;
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
  defaultValue: D,
  config: U = {} as U
): ConfiguredMap<TypeDefault<U, D>> => ({
  map: (source) => {
    const c = {
      ...defaultValue,
      ...config,
    } as TypeDefault<U, D>;
    return mapper(c)(source);
  },
  input: (config?.input || defaultValue.input) as ToFinalizedConfig<U, D>["input"],
  output: (config?.output || defaultValue.output) as ToFinalizedConfig<U, D>["output"],
  cardinality: (config?.cardinality || defaultValue.cardinality) as ToFinalizedConfig<
    U,
    D
  >["cardinality"],
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
export const mapToFn = <I, O>(map: MapTo<I, O>) => {
  return mapper(DEFAULT_ONE_TO_MANY_MAPPING)<I, O>(map);
};

/**
 * Provides a `config` method which allows the relationships between _inputs_
 * and _outputs_ to be configured.
 */
export const mapToDict: MapperApi = {
  config(config) {
    const c = { DEFAULT_ONE_TO_MANY_MAPPING, ...config };
    return c
      ? setMapper(DEFAULT_ONE_TO_MANY_MAPPING, c) //
      : setMapper(DEFAULT_MANY_TO_ONE_MAPPING);
  },
  oneToOne(config) {
    const c = { DEFAULT_ONE_TO_MANY_MAPPING, ...config };
    return c
      ? setMapper(DEFAULT_ONE_TO_ONE_MAPPING, c) //
      : setMapper(DEFAULT_ONE_TO_ONE_MAPPING);
  },
  manyToOne(config) {
    const c = { DEFAULT_ONE_TO_MANY_MAPPING, ...config };
    return c
      ? setMapper(DEFAULT_MANY_TO_ONE_MAPPING, c) //
      : setMapper(DEFAULT_MANY_TO_ONE_MAPPING);
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
