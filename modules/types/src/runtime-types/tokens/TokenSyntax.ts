/**
 * **TokenSyntax**`<T>`
 *
 * Provides the shape of the token as well as an
 * encoder/decoder to ensure parameter values of
 * tokens will not interfere with string pattern
 * matching.
 */
export interface TokenSyntax<T extends string> {
  kind: "TokenSyntax";
  /** the name of the Token Syntax */
  name: T;
  /** the initial starting character's of a token */
  start: string;
  /** a token's  */
  end: string;
  /** the initial starting character's of a token */
  sep: string;

  /**
   * An encoder for parameter values to ensure parsing
   * mistakes on the token are avoided.
   */
  encode: <T extends string>(content: T) => string;
  /**
   * A decoder for parameter values to
   */
  decode: <T extends string>(token: T) => string;
}
