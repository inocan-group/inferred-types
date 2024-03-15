import { 
  IfContains,
  AfterFirst, 
  First, 
} from "src/types/index";



type Process<
  TSet extends readonly unknown[],
  TUnique extends readonly unknown[] = []
> = [] extends TSet
? TUnique
: Process<
  AfterFirst<TSet>,
  IfContains<
    TUnique, First<TSet>,
    TUnique,
    [...TUnique, First<TSet>]
  >
>;



/**
 * **Unique**`<TSet>`
 * 
 * Given a tuple/set of values, this utility will reduce this tuple to
 * unique values in the set.
 */
export type Unique<
  TSet extends readonly unknown[]
> = Process<TSet>;
