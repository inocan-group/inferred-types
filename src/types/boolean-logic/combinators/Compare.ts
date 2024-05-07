import { TupleToUnion } from "../..";
import { Contains, EndsWith, IsEqual, StartsWith } from "../operators";
import { DoesExtend } from "../operators/DoesExtend";

/**
 * **ComparatorOperation**
 * 
 * A union type providing various ways in which two values
 * can be compared.
 */
export type ComparatorOperation = 
| "extends"
| "equals"
| "contains"
| "startsWith"
| "endsWith";

type Unionize<T> = T extends readonly unknown[]
  ? TupleToUnion<T>
  : T;

/**
 * **Compare**`<TVal,TOp,TComparator>`
 * 
 * Compares the value `TVal` with `TComparator` using
 * the `TOp` _operator_.
 */
export type Compare<
  TVal,
  TOp extends ComparatorOperation, 
  TComparator
> = TOp extends "extends"
? DoesExtend<TVal, Unionize<TComparator>>
: TOp extends "equals"
? IsEqual<TVal, Unionize<TComparator>>
: TOp extends "contains"
? Contains<TVal,Unionize<TComparator>>
: TOp extends "startsWith"
? StartsWith<TVal, Unionize<TComparator>>
: TOp extends "endsWith"
? EndsWith<TVal, Unionize<TComparator>>
: never;
