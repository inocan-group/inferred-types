import { MapToWithFiltering } from "src/types/dictionary";

/**
 * **mapTo**
 *
 * A utility function which maps one dictionary structure `I` to another `O`; where:
 *
 * - `I` maps to `O[ ]` so this allows a cardinality of 0:M
 * - In other words ... values from `I` can be filtered, translated 1:1 or split into multiple outputs
 * - Type constrains laid out by `I` and `O` will be enforced by type system
 *
 * ```ts
 * type I = { title: string; color: string; products: Product[] };
 * type O = { title: string; count: number };
 * const summarize: mapTo<I,O>()
 *  .map();
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
