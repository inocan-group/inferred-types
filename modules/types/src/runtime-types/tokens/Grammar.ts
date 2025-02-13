import type { Token } from "./Token";
import type { TokenSyntax } from "./TokenSyntax";

export interface Grammar<
  S extends TokenSyntax<any, any> = TokenSyntax<any, any>,
  T extends readonly Token<any, any>[] = readonly Token<any, any>[],
> {
  kind: "Grammar";
  name: string;
  tokens: T;
  syntax: S;
  /**
   * Type guard used to validate an incoming variable as being
   * of a given type.
   */
  is: any;

  /**
   * A function which will identify a valid token and then provide
   * it's type information.
   */
  lookup: any;
}
