import { Constant } from "src/constants/index";

/**
 * **createConstant**(kind)
 * 
 * Creates a `Constant<TKind>` type.
 */
export function createConstant<TKind extends string>(kind: TKind) {
  return {
    _type: "Constant",
    kind
  } as Constant<TKind>;
}
