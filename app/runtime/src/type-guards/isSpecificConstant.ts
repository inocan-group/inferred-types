
import { Constant } from "@inferred-types/constants";
import { isConstant } from "@inferred-types/runtime";


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
