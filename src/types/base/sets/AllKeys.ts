import { Keys, AfterFirst, First, Dedupe, AnyObject, Tuple } from "..";

type Calc<
  T extends readonly (Tuple | AnyObject)[],
  Acc extends readonly PropertyKey[] = []
> = [] extends T
  ? Dedupe<Acc>
  : Calc<
      AfterFirst<T>,
      [...Acc, ...Keys<First<T>>]
    >;

/**
 * **AllKeys**<TContainers>
 */
export type AllKeys<TContainers extends readonly (Tuple | AnyObject)[]> = Calc<TContainers>;
