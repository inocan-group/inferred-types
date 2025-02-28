import type { LogicalReturns, LogicFunction } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { isBoolean, isFunction } from "inferred-types/runtime";

export function logicalReturns<
    TConditions extends readonly (boolean | LogicFunction)[],
>(conditions: TConditions) {
    return conditions.map(c => isBoolean(c)
        ? c
        : isFunction(c)
            ? c()
            : Never,
    ) as unknown as LogicalReturns<TConditions>;
}
