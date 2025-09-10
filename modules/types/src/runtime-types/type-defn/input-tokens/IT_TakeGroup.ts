import type { As, Err, GetInputToken, IsNever, IT_TakeOutcome, IT_Token, Join, NestedSplit, Trim } from "inferred-types/types";

/**
 * **IT_TakeGroup**`<T>`
 *
 * Attempts to parse a _group_ at the head of the parse string `T`.
 *
 * - a group starts with `(` character and is terminated with a `)`
 * which resides at the "root" level
 */
export type IT_TakeGroup<T extends string> = As<
    T extends `(${infer Rest extends string}` // validate this is the right handler
        ? NestedSplit<Rest, ")"> extends infer Parts extends readonly string[]
            ? Parts["length"] extends 1
                ? Err<
                    `malformed-token/group`,
                    `The IT_TakeGroup failed to find the terminating ')' character in: '${Trim<T>}'`,
                    {
                        token: T;
                    }
                >
                : Parts extends [
                    infer Block extends string,
                    ...infer Rest extends readonly string[]
                ]
                    ? GetInputToken<Trim<Block>> extends Error
                        ? Err<
                            `malformed-token/group`,
                            [IsNever<GetInputToken<Trim<Block>>>] extends [true]
                                ? `The group's interior token -- ${Trim<Block>} -- returned the 'never' type when trying to resolve This shouldn't happen and indicates an error in one of the Take utilities!`
                                : `The IT_TakeGroup failed while trying to parse the group's interior: '${Trim<Block>}'. The underlying error was: ${GetInputToken<Trim<Block>>["message"]}`,
                            {
                                group: Trim<Block>;
                                rest: Join<Rest, ")">;
                                underlying: GetInputToken<Trim<Block>>;
                            }
                        >
                        : GetInputToken<Trim<Block>> extends infer IT extends IT_Token

                            ? As<{
                                __kind: "IT_Token";
                                kind: "group";
                                token: `(${Trim<Block>})`;
                                underlying: IT;
                                type: (IT["type"]);
                                rest: Trim<Join<Rest, ")">>;
                            }, IT_Token<"group">>
                            : never // Block/Rest will always resolve
                    : Err<`wrong-handler/group`>
            : Err<`wrong-handler/group`>
        : Err<`wrong-handler/group`>,
    IT_TakeOutcome<"group">
>;
