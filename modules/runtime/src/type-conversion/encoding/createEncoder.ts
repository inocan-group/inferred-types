import type {
  AnyObject,
  AsFromTo,
  NarrowObject,
  ReplaceAllFromTo
} from "inferred-types/types";
import { reverseLookup } from "inferred-types/runtime";



function encode<
  TDefn extends NarrowObject<N> & AnyObject,
  N extends string
>(defn: TDefn) {
  return <E extends string>(text: E) => {
    let results: string = text;
    const keys = Object.keys(defn);

    for (const key of keys) {
      const find = key as string & keyof typeof defn;
      const replace = defn[find];

      results = results.replaceAll(find, replace);
    }

    return results as unknown as ReplaceAllFromTo<E, AsFromTo<TDefn>>;
  };
}

function decode<
  TDefn extends NarrowObject<N> & AnyObject,
  N extends string
>(defn: TDefn) {

  return <D extends string>(encoded: D) => {
    let results: string = encoded;
    const lookup = defn;
    const keys = Object.keys(lookup);

    for (const key of keys) {
      const find = key as string & keyof typeof lookup;
      const replace = lookup[find] as string;

      results = results.replaceAll(find, replace);
    }

    return results as unknown as ReplaceAllFromTo<D, AsFromTo<TDefn>>;
  };
};


/**
 * **createEncoder**`(defn) -> [ encoder, decoder ]`
 *
 * Creates an encoder and decoder pair when given a definition
 * object of _string_ keys and _string_ values.
 */
export function createEncoder<
  TDefn extends NarrowObject<N> & AnyObject,
  N extends string
>(
  defn: TDefn,
) {
  return { encoder: encode(defn), decoder: decode(reverseLookup(defn)) }
}
