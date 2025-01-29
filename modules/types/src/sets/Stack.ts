export type StackPairing = [enter: string, exist: string];

export interface Stack {
  /**
   * this represents a _complete_ structure because there are
   * the same number -- and sequence of -- the tokens in the string
   */
  isBalanced: boolean;

}

/**
 * **StackEval**`<T>`
 *
 * A configured stack evaluator with a `evaluate(str)` method which can
 * be called to produce a `Stack` type.
 *
 * - this type is used to evaluate a string literal type and decompose it's
 * structure based on the symbols configured to identify increasing and decreasing
 * stack depth.
 */
export interface StackEval<
  T extends readonly StackPairing[],
> {
  kind: "StackEval";
  pairings: T;
  evaluate: <U extends string>(string: U) => any;
}

export type ConfigureStackEval = <T extends readonly StackPairing[]>(tokens: T) =>
StackEval<T>;
