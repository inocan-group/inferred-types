import { IfAnd,  IsArray, IsObject, NotLength } from "src/types";
import { Keys } from "src/types/dictionary";

/**
 * **IsIndexable**`<T>`
 * 
 * Boolean operator which detects if `T` is _indexable_ which means that it
 * is either an array or object and that at least one "key" is known to the
 * type system.
 */
export type IsIndexable<T> = IfAnd<
  [ IsArray<T>, NotLength<T & readonly unknown[],0> ],
  // array is indexable
  true,
  IfAnd<
    [ IsObject<T>, NotLength<Keys<T & object>,0> ],
    // object is indexable
    true,
    false
  >
>;
