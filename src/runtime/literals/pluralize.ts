import {
  ALPHA_CHARS,
  CONSONANTS,
  PLURAL_EXCEPTIONS,
  SINGULAR_NOUN_ENDINGS
} from "src/constants/index";
import { Mutable, Pluralize, TupleToUnion } from "src/types/index";
import { stripTrailing, split } from "src/runtime/index";

const isException = <T extends string>(word: T) => Object.keys(PLURAL_EXCEPTIONS).includes(word);

const END_IN = [
  "is",
  "y",
  "f",
  "singular-noun"
] as const;
type EndsIn = TupleToUnion<Mutable<typeof END_IN>>;

const endingIn = <
  T extends string,
  U extends EndsIn
>(word: T, postfix: U) => {
  switch (postfix) {
    case "is":
      return word.endsWith(postfix) ? `${word}es` : undefined;
    case "singular-noun":
      return SINGULAR_NOUN_ENDINGS.some(i => word.endsWith(i))
        ? split(word).every((i) => [...ALPHA_CHARS].includes(i as any))
          ? `${word}es`
          : undefined
        : undefined;
    case "f":
      return word.endsWith("f")
        ? stripTrailing(word, "f") + "ves"
        : word.endsWith("fe")
          ? stripTrailing(word, "fe") + "ves"
          : undefined;
    case "y":
      return word.endsWith("y")
        ? CONSONANTS.includes(word.slice(-2, 1) as any)
          ? stripTrailing(word, "y") + "ies"
          : undefined
        : undefined;
    default:
      throw new Error(`endingIn received "${postfix}" as a postfix but this ending is not known!`);
  }
};

/**
 * **pluralize(** word **)**
 * 
 * Pluralizes the word using _language rules_ on pluralization for English as well as
 * leveraging many known exceptions to the linguistic rules. 
 * 
 * **Note:** _if the string passed into this function is a literal string then the **type** 
 * will be pluralized along with the runtime value._
 */
export const pluralize = <T extends string>(word: T): Pluralize<T> => {
  const result: unknown = isException(word)
    ? PLURAL_EXCEPTIONS[word as keyof typeof PLURAL_EXCEPTIONS]
    : endingIn(word, "is") ||
    endingIn(word, "singular-noun") ||
    endingIn(word, "f") ||
    endingIn(word, "y") ||
    `${word}s`; // add "s" if no other patterns match

  return result as Pluralize<T>;
};
