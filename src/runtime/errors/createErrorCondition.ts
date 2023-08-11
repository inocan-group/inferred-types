import { ErrorCondition } from "src/types";

/**
 * **createErrorConditionTemplate**(domain) => (kind) => (msg) => ErrorCondition
 * 
 * A higher order runtime utility for generating reusable `ErrorCondition`'s at
 * runtime.
 */
export const createErrorCondition = <
  TDomain extends string = "global"
>(domain?: TDomain) => <
  TKind extends string
>(kind: TKind) => <
  TMsg extends string = ""
>(message: TMsg): ErrorCondition<TKind,TMsg,TDomain> => {
  return {
    _type: "ErrorCondition",
    domain: (domain || "global") as TDomain,
    kind,
    message: message || "" as TMsg
  } as ErrorCondition<TKind,TMsg,TDomain>;
};
