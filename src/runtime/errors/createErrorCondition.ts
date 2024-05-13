import { EmptyObject,  Throw, TypeErrorInfo } from "src/types/index";
import { Never } from "src/constants/index"

/**
 * **createErrorConditionTemplate**(domain) => (kind) => (msg) => ErrorCondition
 * 
 * A higher order runtime utility for generating reusable `ErrorCondition`'s at
 * runtime.
 */
export const createErrorCondition = <
  TUtility extends string = never
>(utility: TUtility = Never) => <
  TKind extends string,
  TMsg extends string = never,
  TOpts extends TypeErrorInfo = EmptyObject
>(
  kind: TKind, 
  msg: TMsg = Never, 
  opts: TOpts = {} as EmptyObject as TOpts 
) => {
  return {
    __kind: "ErrorCondition",
    kind,
    msg,
    utility,
    ...opts
  } as Throw<TKind, TMsg, TUtility,TOpts>;
};
