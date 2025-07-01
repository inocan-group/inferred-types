import type { RuntimeType__Atomic } from "inferred-types/types";
import { createTakeFunction, createStaticTakeFunction } from "runtime/take/create";
import { err, isNull, isNumber, isString, isUndefined, stripLeading, usingLookup } from "inferred-types/runtime";


type AtomicLookup<T extends string> = [T] extends ["null"]
    ? null
    : [T] extends ["undefined"]
        ? undefined
        : [T] extends ["false"]
            ? false
            : [T] extends ["true"]
                ? true
                : [T] extends ["boolean"]
                    ? boolean
                    : [T] extends [symbol]
                        ? symbol
                        : never;

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
        "string", "number",
        "true", "false", "boolean",
        "null", "undefined", "symbol", "void"
    )
    .callback(p => {
        const { found, state } = p;
        const { parse, tokens } = state;

        if (!(found in Lookup)) {
            throw err(`parser/atomic`);
        }

        return Lookup[found as keyof typeof Lookup]

    });


const a = takeAtomicToken({ parse: "stringy" })


const b = createStaticTakeFunction(
    ["string", "number", "void", "true"],
    payload => {
        const { item, tokens } = payload;
    },

)
