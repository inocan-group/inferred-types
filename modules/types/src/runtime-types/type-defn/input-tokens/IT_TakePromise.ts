import type { Err, FromInputToken__String, Join, NestedSplit, Trim } from "inferred-types/types";

/* eslint-disable ts/no-unused-vars, unused-imports/no-unused-vars */

export type IT_TakePromise<T extends string> = T extends `Promise<${infer Rest extends string}`
    ? NestedSplit<Rest, ">"> extends [
        infer Block extends string,
        ...infer Rest extends readonly string[]
    ]
        ? FromInputToken__String<Block> extends Error
            ? Err<
                `malformed-token`,
                `Failed to parse the payload Promise<T> interior: '${Block}'. ${FromInputToken__String<Block>["message"]}`,
                { token: T; block: Block }
            >
            : {
                __kind: "IT_Token";
                kind: "promise";
                token: `Promise<${Block}>`;
                type: Promise<FromInputToken__String<Block>>;
                rest: Trim<Join<Rest, ">">>;
            }
        : never
    : Err<"wrong-handler">;
