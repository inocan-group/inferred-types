import { MapToWithFiltering } from "src/types/dictionary";

/**
 * **mapTo**
 *
 * A utility function which maps one dictionary structure `I` to another `O`; which allows
 * the transform to:
 *
 * - _split_ inputs into multiple outputs
 * - _map_ 1:1 between input and output
 * - _filter_ inputs which don't meet certain criteria (by returning `null`)
 *
 * This higher order function first asks for the mapping criteria:
 * ```ts
 * const mapper = mapTo<I,O>(i => i.name
 *  ? [
 *      { name: i.name, a: "static text", b: i.products.length }
 *    ]
 *  : null
 * );
 * ```
 *
 * and now you'll have a _mapper_ variable will be assigned as a mapping fn:
 * ```ts
 * function (source: I | I[]): O[]
 * ```
 */
export const mapTo =
  <I extends {}, O extends {}>(cb: MapToWithFiltering<I, O>) =>
  (source: I | I[]) => {
    if (Array.isArray(source)) {
      return source.flatMap((i) => cb(i)).filter((i) => i !== null) as O[];
    } else {
      const result = cb(source);
      return result ? result : ([] as O[]);
    }
  };
