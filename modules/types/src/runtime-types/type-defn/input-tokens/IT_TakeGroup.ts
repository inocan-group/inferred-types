import { As, Err, GetInputToken, InputToken, IT_TakeOutcome, IT_Token, Join, NestedSplit, Trim } from "inferred-types/types";

/**
 * **IT_TakeGroup**`<T>`
 *
 * Attempts to parse a _group_ at the head of the parse string `T`.
 *
 * - a group starts with `(` character and is terminated with a `)`
 * which resides at the "root" level
 */
export type IT_TakeGroup<T extends string> = As<
    T extends `(${infer Rest extends string}`
        ? NestedSplit<Rest, ")"> extends [
            infer Block extends string,
            ...infer Rest extends readonly string[]
        ]
            ? GetInputToken<Trim<Block>> extends Error
                ? Err<
                    `malformed-handler/group`,
                    `The IT_TakeGroup failed while trying to parse the group's interior: '${Trim<Block>}'. ${GetInputToken<Trim<Block>>["message"]}`,
                    {
                        group: Trim<Block>;
                        rest: Join<Rest, ")">;
                    }
                >
                : GetInputToken<Trim<Block>> extends infer IToken extends IT_Token

                ? As<{
                        __kind: "IT_Token";
                        kind: "group";
                        token: Trim<Block>;
                        underlying: IToken;
                        type: IToken["type"];
                        rest: Trim<Join<Rest, ")">>;
                    },
                    IT_Token<"group">
                >
                : never
        : Err<
                `malformed-handler/group`,
                `The IT_TakeGroup failed to find the terminating ')' character in: '${Trim<Rest>}'`,
                {
                    group: Trim<Rest>;
                }
        >
    : Err<`wrong-handler`>,
    IT_TakeOutcome<"group">
>;
