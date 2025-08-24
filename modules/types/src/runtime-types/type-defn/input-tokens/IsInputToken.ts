import type { Dictionary, Every, GetInputToken, InputToken, IsWideObject, Values } from "inferred-types/types";

/**
 * **IsInputToken**`<T>`
 *
 * Tests whether `T` is a valid `InputToken` (string or otherwise)
 */
export type IsInputToken<T> = T extends InputToken
    ? T extends string
        ? GetInputToken<T> extends Error
            ? false
            : true
        : T extends readonly string[]
            ? Every<
                {
                    [K in keyof T]: IsInputToken<T[K]>
                },
                "true",
                []
            >
            : T extends Dictionary
                ? IsWideObject<T> extends true
                    ? boolean
                    : Values<T> extends infer ObjValues extends readonly string[]
                        ? Every<
                            {
                                [K in keyof ObjValues]: IsInputToken<ObjValues[K]>
                            },
                            "true",
                            []
                        >
                        : false
                : false
    : false;
