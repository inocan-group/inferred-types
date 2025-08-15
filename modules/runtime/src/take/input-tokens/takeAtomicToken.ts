import type { RuntimeType__Atomic } from "inferred-types/types";
import {
    createTakeFunction,
    err,
    isNull,
    isNumber,
    isString,
    isUndefined
} from "inferred-types/runtime";

const Lookup = {
    null: {
        kind: "atomic",
        type: null,
        token: "null",
        extends(val: unknown): val is null {
            return isNull(val);
        }
    },
    undefined: {
        kind: "atomic",
        type: undefined,
        token: "undefined",
        extends(val: unknown): val is undefined {
            return isUndefined(val);
        }
    },
    string: {
        kind: "atomic",
        type: "string" as unknown as string,
        token: "string",
        extends(val: unknown): val is string {
            return isString(val);
        }
    },
    number: {
        kind: "atomic",
        type: "number" as unknown as number,
        token: "number",
        extends(val: unknown): val is number {
            return isNumber(val);
        }
    },
} as const satisfies Record<string, RuntimeType__Atomic>;

export const takeAtomicToken = createTakeFunction("static")
    .enum(
        "string",
        "number",
        "true",
        "false",
        "boolean",
        "null",
        "undefined",
        "symbol",
        "void"
    )
    .callback((p) => {
        const { found, state } = p;

        if (!(found in Lookup)) {
            throw err(`parser/atomic`);
        }

        return Lookup[found as keyof typeof Lookup];
    });
