import { ALPHA_CHARS, WHITESPACE_CHARS } from "inferred-types/constants";
import { createTakeWhileFunction } from "inferred-types/runtime";
import { RuntimeType__Atomic } from "inferred-types/types";

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


export const takeAtomicToken = createTakeWhileFunction(
    ALPHA_CHARS,
    {
        mustFollow: [...WHITESPACE_CHARS, "|", "&"],
        callback: (r) => {

            return [
                {
                    kind: "atomic",
                    token: r.head,
                    type: r.head as unknown as AtomicLookup<typeof r.head>,


                },
                r.rest
            ] as [ RuntimeType__Atomic<typeof r.head, AtomicLookup<typeof r.head>>, string ]
        }
    }
)
