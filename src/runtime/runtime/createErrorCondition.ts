import { ErrorCondition } from "../literals/ErrorCondition";

/**
 * **createErrorCondition**(domain) => (kind) => (msg) => ErrorCondition
 * 
 * A runtime utility for facilitating the creation of `ErrorCondition`
 * outcomes.
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
  };
};
