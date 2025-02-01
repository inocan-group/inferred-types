import type { AsFromTo, ReplaceAllFromTo, ReverseLookup } from "inferred-types/types";
import { reverseLookup } from "src/dictionary";

/**
 * **createEncoder**`(defn) -> [ encoder, decoder ]`
 *
 * Creates an encoder and decoder pair when given a definition
 * object of _string_ keys and _string_ values.
 */
export function createEncoder<D extends Record<string, string>>(
  defn: D,
) {
  type Encoder<T extends string> = ReplaceAllFromTo<T, AsFromTo<D>>;
  type Decoder<T extends string> = ReverseLookup<D> extends Record<string, string>
    ? ReplaceAllFromTo<T, AsFromTo<ReverseLookup<D>> >
    : never;

  const encode = <T extends string>(text: T): Encoder<T> => {
    let results: string = text;
    const keys = Object.keys(defn);

    for (const key of keys) {
      const find = key as string & keyof typeof defn;
      const replace = defn[find];

      results = results.replaceAll(find, replace);
    }

    return results as Encoder<T>;
  };

  const decode = <T extends string>(encoded: T): Decoder<T> => {
    let results: string = encoded;
    const lookup = reverseLookup(defn);
    const keys = Object.keys(lookup);

    for (const key of keys) {
      const find = key as string & keyof typeof lookup;
      const replace = lookup[find] as string;

      results = results.replaceAll(find, replace);
    }

    return results as Decoder<T>;
  };

  return [encode, decode];
}
