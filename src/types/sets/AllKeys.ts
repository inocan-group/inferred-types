import { AnyObject, Tuple } from "../base-types";
import { Keys, AfterFirst, First } from "src/types";

type Calc<
  T extends readonly (Tuple | AnyObject)[],
  Acc extends readonly PropertyKey[] = []
> = [] extends T
  ? Unique<Acc>
  : Calc<
      AfterFirst<T>,
      [...Acc, ...Keys<First<T>>]
    >;

/**
 * **AllKeys**<TContainers>
 */
export type AllKeys<TContainers extends readonly (Tuple | AnyObject)[]> = Calc<TContainers>;
