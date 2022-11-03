import {
  MapDirectionVal,
  MapFn,
  MapFnInput,
  MapperCardinalityIn,
  MapperCardinalityOut,
  MapTo,
} from "src/types/dictionary";
import { OptRequired } from "src/types/literal-unions";
import { createFnWithProps } from "../createFnWithProps";

export interface MapConfig<
  IR extends OptRequired = "req",
  D extends MapDirectionVal = "I -> O[]",
  OR extends OptRequired = "opt"
> {
  input?: IR;
  output?: OR;
  direction?: D;
}

/**
 * Provides a mapper function using the default configuration
 */
export type MapperApiDefault = <I, O>(map: MapTo<I, O>) => MapFn<I, O>;

/**
 * Provides opportunity to configure _input_ and _output_ relationships
 * prior to providing a mapping function.
 */
export type MapperApiConfigured = <
  IR extends OptRequired = "req",
  D extends MapDirectionVal = "I -> O[]",
  OR extends OptRequired = "opt"
>(
  config: MapConfig<IR, D, OR>
) => <I, O>(map: MapTo<I, O, IR, D, OR>) => MapFn<I, O, IR, D, OR>;

/**
 * The single implementation for all mapping
 */
const mapper =
  <
    IR extends OptRequired = "req",
    D extends MapDirectionVal = "I -> O[]",
    OR extends OptRequired = "opt"
  >(
    config: MapConfig<IR, D, OR> = {}
  ) =>
  <I, O>(map: MapTo<I, O, IR, D, OR>) => {
    // TODO
    config = {
      input: "req",
      output: "opt",
      direction: "I -> O[]",
      ...config,
    } as Required<MapConfig<IR, D, OR>>;

    const fn = <S extends MapFnInput<I, IR, D>>(source?: S) => {
      const isArray =
        config.direction === "I -> O[]" && Array.isArray(source)
          ? true
          : config.direction === "I[] -> O" && Array.isArray(source) && Array.isArray(source[0])
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
 * **mapTo** _utility_
 *
 * This utility creates a strongly typed data mapper which maps from one
 * known source `I` to another `O`:
 * ```ts
 * const mapper = mapTo<I, O>(i => [{
 *    foo: i.bar
 * }]);
 * ```
 */
export const mapToFn = <I, O>(map: MapTo<I, O>) => {
  return mapper()<I, O>(map);
};

/**
 * Provides a `config` method which allows the relationships between _inputs_
 * and _outputs_ to be configured.
 */
export const mapToDict = {
  /** configure the relationship between the _inputs_ and _outputs_ */
  config: <
    IR extends OptRequired = "req",
    D extends MapDirectionVal = "I -> O[]",
    OR extends OptRequired = "opt"
  >(
    c: MapConfig<IR, D, OR> = { input: "req", output: "opt", direction: "I -> O[]" } as MapConfig<
      IR,
      D,
      OR
    >
  ) => ({
    /**
     * create your mapping with your recently setup configuration:
     * ```ts
     * const mapper = mapTo
     *  .config({ ... })
     *  .map<I, O>(i => [{
     *    foo: i.bar
     * }]);
     * ```
     */
    map<I, O>(map: MapTo<I, O, IR, D, OR>): MapFn<I, O, IR, D, OR> {
      return mapper(c)(map);
    },
  }),
};

/**
 * **mapTo** _utility_
 *
 * This utility creates a strongly typed data mapper which maps from one
 * known source `I` to another `O`.
 */
export const mapTo = createFnWithProps(mapToFn, mapToDict);
