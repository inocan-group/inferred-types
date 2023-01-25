import { IfSomeEqual } from "types/boolean-logic";
import { AfterFirst, First, IntoSet } from "types/lists";
import { SetCandidate } from "./SetCandidate";

type SetRemovalAcc<
  TSet extends readonly any[],
  TRemoval extends readonly any[],
  Processed extends readonly any[] = [],
> = [] extends TSet
  ? Processed
  : IfSomeEqual<
      First<TSet>, TRemoval,
      SetRemovalAcc<AfterFirst<TSet>, TRemoval, Processed>,
      SetRemovalAcc<AfterFirst<TSet>, TRemoval,  [...Processed, First<TSet>]>
    >;

/**
 * **SetRemoval**`<TSet, TRemoval>`
 * 
 * Takes two sets -- `TSet` as the primary set, and `TRemoval` -- and produces the
 * set subtraction of `TSet` minus the elements in `TRemoval`.
 * 
 * **Note:** a "set" can be either an array of values, or a union of values.
 */
export type SetRemoval<
  TSet extends SetCandidate,
  TRemoval extends SetCandidate,
> = Readonly<SetRemovalAcc<IntoSet<TSet>, IntoSet<TRemoval>>>;
