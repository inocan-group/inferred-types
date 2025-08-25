import type { Err, FromInputToken__String, Join, NestedSplit, Trim, TrimEach } from "inferred-types/types";

type GetElementTypes<
    T extends readonly string[],
> = {
    [K in keyof T]: T[K] extends `${infer ReqToken}?`
        ? FromInputToken__String<ReqToken>
        : FromInputToken__String<T[K]>
};

/**
 * attempts to take any array with at least one fixed type
 */
export type IT_TakeLiteralArray<T extends string> = T extends `[${infer Rest extends string}`
    ? NestedSplit<Rest, "]"> extends [
        infer Block extends string,
        ...infer Rest extends string[]
    ]
        ? NestedSplit<Block, ","> extends infer Elements extends readonly string[]
            ? TrimEach<Elements> extends infer Elements extends readonly string[]
                ? Elements["length"] extends 0
                    ? {
                        __kind: "IT_Token";
                        kind: "array-literal";
                        elements: [];
                        token: "[]";
                        type: [];
                        rest: Trim<Join<Rest, ",">>;
                    }
                    : {
                        __kind: "IT_Token";
                        kind: "literal-array";
                        token: `[ ${Join<Elements, ", ">} ]`;
                        type: GetElementTypes<Elements>;
                        rest: Trim<Join<Rest, ",">>;
                    }

                : never
            : Err<`malformed-token`>
        : Err<"wrong-handler/array-literal">
    : Err<"wrong-handler/array-literal">;
