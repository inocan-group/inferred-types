/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ErrorCondition, IfEqual, IfNull } from "src/types/index";

/**
 * **IsErrorCondition**`<TEval,[TKind]>`
 * 
 * Type utility which checks whether `TEval` is an `ErrorCondition` type.
 * 
 * - If you want to isolate to only a particular _kind_ of error you may
 * also use the optional `TKind` generic.
 */
export type IsErrorCondition<
  TEval, 
  TKind extends string | null = null,
> = TEval extends ErrorCondition
  ? IfNull<
        TKind, 
        true,
        IfEqual<TEval["kind"], TKind, true, false>
      >
  : false;
