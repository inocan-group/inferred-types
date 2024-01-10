import { IfFalse, IfTrue, IsSingularNoun } from "src/types";

/**
 * **IfSingularNoun**`<T,IF,ELSE,[MAYBE]>`
 * 
 * Branching utility based on whether `T` is a singular noun.
 */
export type IfSingularNoun<T, IF, ELSE, MAYBE = IF | ELSE> = 
IfTrue<
  IsSingularNoun<T>, 
  IF,
  IfFalse<
    IsSingularNoun<T>,
    ELSE,
    MAYBE
  >
>;
