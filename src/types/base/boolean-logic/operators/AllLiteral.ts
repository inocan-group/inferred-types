import { AfterFirst, First, IfLiteral, Tuple } from "src/types";

type Process<
  TRemaining extends Tuple,
> = [] extends TRemaining
? true
: IfLiteral<
    First<TRemaining>,
    Process<AfterFirst<TRemaining>>,
    false
  >;

/**
 * **AllLiteral**`<TTuple>`
 * 
 * A boolean operator which tests whether all properties in
 * the tuple `TTuple` are _literal_ types.
 */
export type AllLiteral<T extends Tuple> = Process<T>;
