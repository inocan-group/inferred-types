import type { ComparisonOperation, GetComparisonParams } from "inferred-types/types";
import { isComparisonOperation } from "runtime/type-guards/comparison/isComparisonOperation";

/**
 * **isValidComparisonParams**`(op, params)`
 *
 * Type guard that validates the parameters passed in are valid for the given
 * operation.
 */
export function isValidComparisonParams<
    TOp extends ComparisonOperation,
    TParams extends readonly unknown[]
>(op: TOp, params: TParams): params is TParams & GetComparisonParams<TOp> {
    return !!isComparisonOperation(op);
}
