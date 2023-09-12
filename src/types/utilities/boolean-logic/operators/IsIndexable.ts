import { IfAnd,  IsArray, IsObject, NotLength ,  NotEqual } from "src/types";

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
    [ IsObject<T>, NotEqual<keyof T, string> ],
    // object is indexable
    true,
    false
  >
>;
