import { Throw } from "src/types/index";


/**
 * **createErrorConditionTemplate**`(kind,[msg],[utility]) => ErrorCondition`
 *
 * A higher order runtime utility for generating reusable `ErrorCondition`'s at
 * runtime.
 */
export const createErrorCondition = <
  TKind extends string,
  TMsg extends string = never,
  TUtility extends string = never
>(
  kind: TKind,
  msg: TMsg = "" as never,
  utility: TUtility = "" as never
) => {
  return {
    __kind: "ErrorCondition",
    kind,
    msg,
    utility,
  } as unknown as Throw<TKind, TMsg, TUtility>;
};


export const errCondition = (
  kind: string,
  msg?: string
) => ({
  __kind: "ErrorCondition",
  kind,
  msg
})
