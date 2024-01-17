import type { 
  AnyObject , 
  Narrowable , 
  RemoveFromList,
  Container,
  WithoutValue
} from "src/types/index";

/**
 * **RemoveEquals**`<TContainer, TCompare>`
 * 
 * Type utility which takes an iterable `TContainer` and removes all elements
 * which _equal_ `TCompare`.
 */
export type RemoveEquals<
  TContainer extends Container,
  TCompare extends Narrowable
> = TContainer extends unknown[]
? RemoveFromList<TContainer, "equals", TCompare>
: TContainer extends readonly unknown[]
  ? Readonly<RemoveFromList<TContainer, "equals", TCompare>>
  : TContainer extends AnyObject // container is an object
    ? WithoutValue<TContainer, TCompare>
      // TODO: this may not match in the narrow type context it is meant to
    : never;
