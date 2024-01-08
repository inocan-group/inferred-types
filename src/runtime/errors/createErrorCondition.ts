import { ErrorCondition } from "src/types";

/**
 * **createErrorConditionTemplate**(domain) => (kind) => (msg) => ErrorCondition
 * 
 * A higher order runtime utility for generating reusable `ErrorCondition`'s at
 * runtime.
 */
export const createErrorCondition = <
  TLibrary extends string = "undefined"
>(library?: TLibrary) => <
  TKind extends string
>(kind: TKind) => <
  TMsg extends string = ""
>(message: TMsg): ErrorCondition<TKind,TMsg,{library: TLibrary}> => {
  return {
    _type: "ErrorCondition",
    library,
    kind,
    message: message || "" as TMsg
  } as ErrorCondition<TKind,TMsg,{library: TLibrary}>;
};
