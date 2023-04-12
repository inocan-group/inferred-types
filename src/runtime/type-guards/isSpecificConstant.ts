import { isEqual, isConstant } from "src/runtime";
import { Constant } from "src/constants";

/**
 * **isSpecificConstant**(kind)
 * 
 * A higher order type guard which tests for a specific `Constant` type.
 */
export function isSpecificConstant<
  TKind extends string
>(kind: TKind) {
  return (value: unknown): value is Constant<TKind> => {
    return isConstant(value) && isEqual(value.kind)(kind) ? true : false;
  };
}
