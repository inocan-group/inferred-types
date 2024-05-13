import { ExpandRecursively } from "../literals/ExpandRecursively";
import { ErrorCondition } from "./ErrorCondition";


export interface PartialErrorDefn {
  kind?: string;
  message?: string;
  utility?: string;
  library?: string;
  underlying?: ErrorCondition;
}

/**
 * **PartialError**`<[TKind],[TMessage],[]>`
 * 
 * Allows an author to configure part of an `ErrorCondition`
 * and then complete it with `CompleteError`.
 */
export type PartialError<
  TConfig extends PartialErrorDefn = PartialErrorDefn
> = ExpandRecursively<
  {__kind: "PartialError"} & TConfig
>


