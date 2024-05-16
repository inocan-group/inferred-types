import { Something } from "../..";

type Process<TVal,TDefault> = TVal extends Something
? TVal
: TDefault;



/**
 * **Default**`<TVal,TDefault,[TProtect]>`
 * 
 * Branching operator which allows giving a value `TVal` a _default value_ when
 * it's value is either `null` or `undefined`.
 */
export type Default<
  TVal,
  TDefault,
> = Process<TVal, TDefault>;
