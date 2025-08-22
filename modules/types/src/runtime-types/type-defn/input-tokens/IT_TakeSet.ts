import type { Err, FromInputToken__String, Join, NestedSplit, Trim } from "inferred-types/types";

// eslint-disable-next-line unused-imports/no-unused-vars, ts/no-unused-vars
export type IT_TakeSet<T extends string> = T extends `Set<${infer Rest}`
? NestedSplit<Rest, ">"> extends [
    infer Block extends string,
    ...infer Rest extends readonly [string, ...string[]]
]
    ? FromInputToken__String<Trim<Block>> extends Error
        ? Err<
            "malformed-token",
            `In Set<T>, the token representing T -- '${Trim<Block>}' -- was not able to be parsed to a type. ${FromInputToken__String<Trim<Block>>["message"]}`
        >
        : {
            __kind: "IT_Token";
            kind: "set";
            token: `Set<${Trim<Block>}>`;
            type: Set<FromInputToken__String<Trim<Block>>>;
            rest: Trim<Join<Rest, ">">>
        }
    : never
: Err<"wrong-handler/set">;
