/* eslint-disable @typescript-eslint/no-explicit-any */

import { 
  Contains, 
  DoesExtend, 
  IsEqual, 
  StartsWith, 
  TupleToUnion, 
  EndsWith, 
  Tuple,
  Or,
} from "src/types/index";


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
| "containsAll"
| "startsWith"
| "endsWith"
| "returnEquals"
| "returnExtends";

type Unionize<T> = T extends readonly unknown[]
  ? TupleToUnion<T>
  : T;

type Process<
TVal,
TOp extends ComparatorOperation, 
TComparator
> = TOp extends "extends"
? DoesExtend<TVal, Unionize<TComparator>>
: TOp extends "equals"
? IsEqual<TVal, Unionize<TComparator>>
: TOp extends "contains"
  ? [TVal] extends [string | number | Tuple]
    ? Contains<TVal,TComparator>
    : never
: TOp extends "containsAll"
? [TVal] extends [Tuple]
  ? [TComparator] extends [string | number | readonly string[]]
    ? Contains<TVal,TComparator>
    : never
  : never
: TOp extends "startsWith"
? [TVal] extends [string | number]
? [TComparator] extends [string | number | readonly string[]]
  ? StartsWith<TVal, TComparator>
  : never
: never
: TOp extends "endsWith"
? [TVal] extends [string | number]
? [TComparator] extends [string | number | readonly string[]]
  ? EndsWith<TVal, TComparator>
  : never
: never
: TOp extends "returnEquals"
? TVal extends ((...args: any[]) => any) ? IsEqual<ReturnType<TVal>,TComparator> : false
: TOp extends "returnExtends"
? TVal extends ((...args: any[]) => any) ? IsEqual<ReturnType<TVal>,TComparator> : false
: never;



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
> = Process<TVal, TOp, TComparator>;
