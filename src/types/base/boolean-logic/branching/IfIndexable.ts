import { Container, IsIndexable } from "src/types";

/**
 * **IfIndexable**`<TContainer,IF,ELSE>`
 * 
 * Branching utility which branches based on whether `TContainer` is
 * both a _container_ and whether it has at least one known key.
 * 
 * **Related:** `IfHasIndex`
 */
export type IfIndexable<
  TContainer,
  IF,
  ELSE
> = TContainer extends Container
? IsIndexable<TContainer> extends true 
  ? IF 
  : ELSE
: ELSE;
