import type {
    AsFromTo,
    Dictionary,
    IsGreaterThan,
    NarrowObject,
    ReplaceAllFromTo,
    TakeFirst,
} from "inferred-types/types";
import { reverseLookup } from "inferred-types/runtime";

type MAX = 35;

function encode<
    TDefn extends NarrowObject<N> & Dictionary,
    N extends string,
>(defn: TDefn) {
    return <E extends string>(input: E) => {
        let text: string = input;
        const keys = Object.keys(defn);

        for (const key of keys) {
            const find = key as string & keyof typeof defn;
            const replace = defn[find];

            text = text.replaceAll(find, replace);
        }

        type FT = AsFromTo<TDefn>;
        type Rtn = ReplaceAllFromTo<E, FT>;

        return text as unknown as Rtn;
    };
}

function decode<
    const TDefn extends Dictionary<string | symbol, N>,
    const N extends string,
>(defn: TDefn) {
    return <D extends string>(encoded: D) => {
        let text: string = encoded;
        const keys = Object.keys(defn);

        for (const key of keys) {
            const find = key as string & keyof typeof defn;
            const replace = defn[find];

            text = text.replaceAll(find, replace);
        }

        type FT = AsFromTo<TDefn>;
        type Rtn = IsGreaterThan<FT["length"], MAX> extends true
            ? ReplaceAllFromTo<D, TakeFirst<FT, MAX>>
            : ReplaceAllFromTo<D, FT>;

        return text as unknown as Rtn;
    };
};

/**
 * **createEncoder**`(defn) -> [ encoder, decoder ]`
 *
 * Creates an encoder and decoder pair when given a definition
 * object of _string_ keys and _string_ values.
 *
 * **Note:**
 *    - Typescript can manage keeping literal types up to about
 * 35 key/values but then it will fall over
 *    - to avoid this we will provide a literal string for key/values
 * 35 or under and then provide fallback to a Branded type of `Encoded` or
 * `Decoded`
 *    - the runtime value will always use the full encoding and decoding
 */
export function createEncoder<
    TDefn extends NarrowObject<N> & Dictionary,
    N extends string,
>(
    defn: TDefn,
) {
    return {
        encoder: encode(defn),
        decoder: decode(reverseLookup(defn)),
    };
}
