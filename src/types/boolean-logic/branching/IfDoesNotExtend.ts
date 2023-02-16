
/**
 * **IfDoesNotExtend**`<TValue, TCompareTo>`
 * 
 * A branching utility which branches based on whether
 * `TValue` _does not_ extend `TCompareTo`.
 * 
 * **Related:** `
 */
export type IfDoesNotExtend<
  TValue, TCompareTo,
  IF = Exclude<TValue, TCompareTo>,
  ELSE = TValue & TCompareTo
> = TValue extends TCompareTo
? ELSE
: IF;
