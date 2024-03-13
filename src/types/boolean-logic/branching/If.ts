import { IfTruthy } from "./IfTruthy";

/**
 * **If**`<TTest,[TIf],[TElse]>`
 * 
 * Branching utility which branches based on whether `TTest` is _truthy_.
 */
export type If<
  TTest,
  TIf = true, 
  TElse = false
> = IfTruthy<TTest, TIf, TElse>
