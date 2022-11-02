import {
  MapDirection,
  MapFn,
  MapFnInput,
  MapInput,
  MapperCardinalityIn,
  MapperCardinalityOut,
  MapTo,
} from "src/types/dictionary";
import { OptRequired } from "src/types/literal-unions";
import { createFnWithProps } from "../createFnWithProps";

export interface MapConfig<
  IR extends OptRequired = "req",
  D extends MapDirection = "I -> O[]",
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
  D extends MapDirection = "I -> O[]",
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
    D extends MapDirection = "I -> O[]",
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

export const mapToFn = <I, O>(map: MapTo<I, O>) => {
  return mapper()<I, O>(map);
};

/**
 * Provides a `config` method which allows the relationships between _inputs_
 * and _outputs_ to be configured.
 */
export const mapToDict = {
  config: <
    IR extends OptRequired = "req",
    D extends MapDirection = "I -> O[]",
    OR extends OptRequired = "opt"
  >(
    c: MapConfig<IR, D, OR> = { input: "req", output: "opt", direction: "I -> O[]" } as MapConfig<
      IR,
      D,
      OR
    >
  ) => ({
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

/**
 * **mapTo**
 *
 * The **mapTo()** utility provides a convenient way to generate a type safe
 * type mapper between `I` and `O` types. You will need to set one or possibly
 * two variables to be ready:
 *
 * 1. The mapper function
 * 2. Set the _cardinality_ you want for the **input** and **output** of the function
 *    - **input**: the input's default cardinality is `0:1`; meaning that there will be zero or one
 * inputs each time the function is called.
 *    - **output**: the output's default cardinality is `0:M` which means that you are expected to
 * return an _array_ of `O` but you can have an empty array to filter out the input.
 *
 * In the default scenario you do your mapping with the cardinality constraints specified
 * but the exported function will have additional optionality on input to allow to
 * use cases:
 * ```ts
 * // <S extends I || I[]>(source?: S)
 * //    => S extends I[] ? O[] : O | null;
 * const m = mapTo<I,O>(i => [{
 *    foo: i.title, bar: i.name
 * }]);
 * // as a map fn with `null` values for map filters
 * const ex1 = items.map(m);
 * // convert to an array of `O[]`; filtered items removed automatically
 * const ex2 = m(items);
 * ```
 */
export const mapToOld = <
  // input to mapper
  I extends {},
  // output to mapper
  O extends {},
  // cardinality of input
  CI extends MapperCardinalityIn = "0:1",
  CO extends MapperCardinalityOut = "0:M"
>(
  cb: MapTo<I, O, CI, CO>
) => {
  const cardinality = {
    input: "0:1" as CI,
    output: "0:M" as CO,
  };

  const mapFn = (source?: I | I[] | undefined) => {
    const isArray = Array.isArray(source);

    if (isArray) {
      // array based value
      return cardinality.input.startsWith("M")
        ? cardinality.output.endsWith("M")
          ? // M:M
            source.flatMap((i) => cb(i)).filter((i) => i !== null)
          : // M:1/0
            cb(source)
        : // 0/1:M
          source.flatMap((i) => cb(i)).filter((i) => i !== null);
    } else {
      // non-array
      const result = source ? cb(source) : undefined;
      return result ? result : [];
    }
  };

  return mapFn as MapTo<I, O, CI, CO>;
};
