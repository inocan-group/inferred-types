import { LOCALES } from "inferred-types/constants";
import { GetEach } from "types/lists";

type LOOKUP = typeof LOCALES;

type ISO639 = GetEach<LOOKUP, "set1">;

/**
 * **ISO639_2**
 *
 * The [ISO 639 standard](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
 * is broken up into different sets but the most commonly used is referred to
 * "set 1" and set 1 provides each language a two letter abbreviation.
 *
 * Alias: `Locale`
 */
export type ISO639_2 = ISO639[number];

/**
 * **ISO639_3**
 *
 * The [ISO 639 standard](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
 * is broken up into different _sets_ where the most commonly used is "set 1" which uses
 * a two letter abbreviation but this type represents "set 2" which uses three letters
 * to represent each language.
 *
 * See Also: `ISO639_2`, `Locale`, `LocaleWithSubTag`
 */
export type ISO639_3 = GetEach<LOOKUP, "set2">[number];

/**
 * **Locale**(ISO639_2)
 *
 * The [ISO 639 standard](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
 * is broken up into different sets but the most commonly used is referred to
 * "set 1" and set 1 provides each language a two letter abbreviation.
 *
 * Alias: `ISO639_2`
 * See Also: `LocaleWithSubTag`, `ISO639_3`
 */
export type Locale = ISO639_2;

type WithSuffix<T extends readonly string[]> = {
    [K in keyof T]: `${T[K]}${"" | `-${string}`}`;
};

/**
 * **LocaleWithSubTag**
 *
 * This type provides valid primary language tags and an
 * optional `-${string}` type for when you want to specify
 * a sub-tag as part of [RFC 5646](https://www.rfc-editor.org/rfc/rfc5646.html).
 */
export type LocaleWithSubTag = WithSuffix<ISO639>;
