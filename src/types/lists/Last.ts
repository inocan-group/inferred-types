import { Tuple } from "../base-types";


/**
 * **Last**`<TList>`
 * 
 * Returns the _last_ element in a list
 */
export type Last<TList extends Tuple> = TList extends [...unknown[], infer Last]
  ? Last
  : TList extends readonly [] ? undefined : never;
