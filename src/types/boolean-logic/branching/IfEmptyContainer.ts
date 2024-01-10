import { Container, EmptyContainer } from "src/types";

/**
 * **IfEmptyContainer**`<TContainer,TIf,TElse>`
 * 
 * Branching utility which branches on whether the `TContainer` passed in is
 * considered _empty_.
 * 
 * Note: `TElse` is defaulted to `TContainer` to help use this utility as a guard against
 * an empty condition. 
 */
export type IfEmptyContainer<
  TContainer extends Container,
  TIf,
  TElse = TContainer
> = EmptyContainer<TContainer> extends true
? TIf
: TElse;
