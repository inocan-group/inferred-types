/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  ALPHA_CHARS, 
  CONSONANTS, 
  PLURAL_EXCEPTIONS, 
  SINGULAR_NOUN_ENDINGS 
} from "src/constants";
import { getEach, pop,  split, stripTrailing } from "src/runtime";
import {  Mutable, Pluralize, TupleToUnion } from "src/types";

const isException = <T extends string>(word: T) => getEach(PLURAL_EXCEPTIONS,0).includes(word as any);

const exceptionLookup = <T extends string>(word: T) => {
  const found = PLURAL_EXCEPTIONS.find(i => i[0] === word);
  if (found) {
    const [plural, _] = pop(found);
    return plural;
  } else {
    throw new Error(`The word "${word}" was supposed to have an exception rule but it couldn't be found!`);
  }
};

const END_IN = [
  "is",
  "y",
  "f",
  "singular-noun"
] as const;
type EndsIn = TupleToUnion<Mutable<typeof END_IN>>;

const endingIn = <T extends string, U extends EndsIn>(word: T, postfix: U): string | undefined => {
  switch(postfix) {
    case "is":
      return word.endsWith(postfix) ? `${word}es` : undefined;
    case "singular-noun":
      return SINGULAR_NOUN_ENDINGS.some(i => word.endsWith(i))
        ? split(word).every((i: string) => ALPHA_CHARS.includes(i as any))
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
        ? CONSONANTS.includes(word.slice(-2,1) as any)
          ? stripTrailing(word, "y") + "ies"
          : undefined
        : undefined;
    default:
      throw new Error(`endingIn received "${postfix}" as a postfix but this ending is not known!`);
  }
};

export const pluralize = <T extends string>(word: T): Pluralize<T> => {
  return (
    isException(word)
    ? exceptionLookup(word)
    : endingIn(word, "is") || 
      endingIn(word, "singular-noun") || 
      endingIn(word, "f") ||
      endingIn(word, "y") ||
      `${word}s` // add "s" if no other patterns match
  ) as Pluralize<T>;
};