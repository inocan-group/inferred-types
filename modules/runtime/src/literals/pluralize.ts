import type { Pluralize } from "inferred-types/types";
import {
    ALPHA_CHARS,
    PLURAL_EXCEPTIONS,
    SINGULAR_NOUN_ENDINGS,
} from "inferred-types/constants";
import { asChars, rightWhitespace, split, stripTrailing } from "inferred-types/runtime";

const isException = <T extends string>(word: T) => Object.keys(PLURAL_EXCEPTIONS).includes(word);

const _END_IN = [
    "is",
    "y",
    "f",
    "singular-noun",
] as const;

type EndsIn = (typeof _END_IN)[number];

/**
 * pluralize based on how word ends
 */
function endingIn<
    T extends string,
    U extends EndsIn,
>(word: T, postfix: U) {
    switch (postfix) {
        case "is":
            return word.endsWith(postfix) ? `${word}es` : undefined;
        case "singular-noun":
            return SINGULAR_NOUN_ENDINGS.some(i => word.endsWith(i))
                ? asChars(word).every(i => [...ALPHA_CHARS].includes(i as any))
                    ? `${word}es`
                    : undefined
                : undefined;
        case "f":
            return word.endsWith("f")
                ? `${stripTrailing(word, "f")}ves`
                : word.endsWith("fe")
                    ? `${stripTrailing(word, "fe")}ves`
                    : undefined;
        case "y":
            return word.endsWith("y")
            // ? CONSONANTS.includes(word.slice(-2, 1) as any)
                ? `${stripTrailing(word, "y")}ies`
            // : undefined
                : undefined;
        default:
            throw new Error(`endingIn received "${postfix}" as a postfix but this ending is not known!`);
    }
}

/**
 * **pluralize(** word **)**
 *
 * Pluralizes the word using _language rules_ on pluralization for English as well as
 * leveraging many known exceptions to the linguistic rules.
 *
 * **Note:** _if the string passed into this function is a literal string then the **type**
 * will be pluralized along with the runtime value._
 */
export function pluralize<T extends string>(word: T): Pluralize<T> {
    const right = rightWhitespace(word);
    const w = word.trimEnd();
    const result: unknown = isException(w)
        ? PLURAL_EXCEPTIONS[w as keyof typeof PLURAL_EXCEPTIONS]
        : endingIn(w, "is")
            || endingIn(w, "singular-noun")
            || endingIn(w, "f")
            || endingIn(w, "y")
            || `${w}s`; // add "s" if no other patterns match

    return `${result}${right}` as unknown as Pluralize<T>;
}
