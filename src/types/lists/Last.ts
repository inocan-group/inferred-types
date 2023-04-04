import { IfReadonlyArray, Mutable, Tuple } from "src/types";


type Convert<TList extends Tuple> = TList extends [...unknown[], infer LastVal]
? LastVal
: undefined;

/**
 * **Last**`<TList>`
 * 
 * Returns the _last_ element in a list
 */
export type Last<TList extends Tuple> = IfReadonlyArray<
  TList,
  Convert<Mutable<TList>>,
  Convert<TList>
>;
