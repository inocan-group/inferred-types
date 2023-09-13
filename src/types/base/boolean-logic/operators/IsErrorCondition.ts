/* eslint-disable @typescript-eslint/no-explicit-any */
import type {  ErrorCondition, IfNull } from "../..";

/**
 * **IsErrorCondition**`<TEval,[TKind]>`
 * 
 * Type utility which checks whether `TEval` is an `ErrorCondition` type.
 * 
 * - If you want to isolate to only a particular _kind_ of error you may
 * also use the optional `TKind` generic.
 */
export type IsErrorCondition<TEval, TKind = null> = TEval extends ErrorCondition<any>
  ? IfNull<
      TKind, 
      true,
      TKind extends TEval["kind"] ? true : false
    >
  : false;
