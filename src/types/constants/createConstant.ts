import { Constant } from "./Constant";

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
