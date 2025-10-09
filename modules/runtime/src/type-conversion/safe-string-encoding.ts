import type {
    SafeDecode,
    SafeEncode,
    SafeEncodingGroup,
} from "inferred-types/types";
import {
    SAFE_ENCODING__BRACKETS,
    SAFE_ENCODING__QUOTES,
    SAFE_ENCODING__WHITESPACE,
    SAFE_ENCODING_KEYS,
} from "inferred-types/constants";
import { mutable, reverseLookup } from "inferred-types/runtime";

export type SafeStringEncoder<
    G extends readonly SafeEncodingGroup[] = ["quotes", "brackets", "whitespace"],
> = <T extends string>(text: T) => SafeEncode<T, G>;

export type SafeStringDecoder<
    G extends readonly SafeEncodingGroup[],
> = <T extends string>(text: T) => SafeDecode<T, G>;

type Grp<T extends readonly SafeEncodingGroup[]> = T extends []
    ? ["quotes", "brackets", "whitespace"]
    : T;

/**
 * **createSafeStringEncoder**`(...groups) -> [encoder, decoder]`
 *
 * specify the groups of characters you want to encode
 * and both an _encoder_ and _decoder_ will be returned.
 */
export function setupSafeStringEncoding<
    G extends readonly SafeEncodingGroup[],
>(
    ...groups: G
): [encode: SafeStringEncoder<Grp<G>>, decode: SafeStringDecoder<Grp<G>>] {
    const g = (groups.length === 0
        ? ["quotes", "brackets", "whitespace"]
        : groups
    ) as Grp<G>;

    /** SafeString encoder */
    const encode: SafeStringEncoder<Grp<G>> = (text) => {
        let results: string = text;
        const lookup = mutable(SAFE_ENCODING_KEYS);

        const keys = g.flatMap(
            i => i === "whitespace"
                ? Object.keys(mutable(SAFE_ENCODING__WHITESPACE))
                : i === "brackets"
                    ? Object.keys(mutable(SAFE_ENCODING__BRACKETS))
                    : i === "quotes"
                        ? Object.keys(mutable(SAFE_ENCODING__QUOTES))
                        : [],
        );

        for (const key of keys) {
            const find = key as string & keyof typeof lookup;
            const replace = lookup[find];

            results = results.replaceAll(find, replace);
        }

        return results as unknown as ReturnType<SafeStringEncoder<Grp<G>>>;
    };

    /** SafeString decoder */
    const decode: SafeStringDecoder<Grp<G>> = (encoded) => {
        let results: string = encoded;
        const lookup = reverseLookup(SAFE_ENCODING_KEYS);

        const keys = g.flatMap(
            i => i === "whitespace"
                ? Object.keys(reverseLookup(SAFE_ENCODING__WHITESPACE))
                : i === "brackets"
                    ? Object.keys(reverseLookup(SAFE_ENCODING__BRACKETS))
                    : i === "quotes"
                        ? Object.keys(reverseLookup(SAFE_ENCODING__QUOTES))
                        : [],
        );

        for (const key of keys) {
            const find = key as string & keyof typeof lookup;
            const replace = lookup[find];

            results = results.replaceAll(find, replace);
        }

        return results;
    };

    return [encode, decode];
}
