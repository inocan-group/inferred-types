import { IfSomeEqual , AfterFirst, First, AsArray , SetCandidate } from "..";

type SetRemovalAcc<
  TSet extends readonly unknown[],
  TRemoval extends readonly unknown[],
  Processed extends readonly unknown[] = [],
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
  TSet extends readonly unknown[],
  TRemoval extends SetCandidate,
> = Readonly<SetRemovalAcc<TSet, AsArray<TRemoval>>>;
