import { COMPARISON_OPERATIONS } from "inferred-types/constants";
import type { ComparisonOperation } from "inferred-types/types";
import { isString } from "runtime/type-guards/isString";

/**
 * Type guard which checks whether `op` is a `ComparisonOperation`.
 */
export function isComparisonOperation(
    op: unknown
): op is ComparisonOperation {
    return isString(op)
        && Object.values(COMPARISON_OPERATIONS).includes(op as any);
}
