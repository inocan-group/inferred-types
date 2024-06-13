
import { Constant } from "src/constants/index";
import { isConstant, isEqual } from "src/runtime/index";


/**
 * **isSpecificConstant**(kind)
 *
 * A higher order type guard which tests for a specific `Constant` type.
 */
export function isSpecificConstant<
  TKind extends string
>(kind: TKind) {
  return (value: unknown): value is Constant<TKind> => {
    return isConstant(value) && value.kind === kind ? true : false;
  };
}
