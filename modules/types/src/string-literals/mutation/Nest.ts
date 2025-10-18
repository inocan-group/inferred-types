import type {
    As,
    BracketNesting,
    Err,
    ErrContext,
    GetExitToken,
    Increment,
    IsEntryToken,
    NestedString,
    Nesting
} from "inferred-types/types";

type CHILD_MARKER = `{{child}}`;

/**
 * **TakeNestedString**`<TParse, TNesting, TEnter, TLevel>`
 *
 * Builds recursive structure based on Nesting strategy
 */
export type TakeNestedString<
    TParse extends string,
    TNesting extends Nesting,
    TEnter extends string | null,
    TLevel extends number,
    TContent extends string = "",
    TChildren extends readonly NestedString[] = []
> = GetExitToken<TEnter, TNesting> extends infer ExitChar extends string | null
    ? TParse extends `${infer Head extends string}${infer Rest extends string}`
    // #region Exiting
        ? Head extends ExitChar
            ? {
                node: As<{
                    content: TContent;
                    level: TLevel;
                    enterChar: TEnter;
                    exitChar: ExitChar;
                    children: TChildren;
                }, NestedString>;
                rest: Rest;
            }
        // #endregion
        // #region Entering
            : IsEntryToken<Head, TNesting> extends true // Recurse to get new level
                ? TakeNestedString<Rest, TNesting, Head, Increment<TLevel>> extends infer Child extends {
                    node: NestedString;
                    rest: string;
                }
                    ? TakeNestedString<Child["rest"], TNesting, TEnter, TLevel, `${TContent}${CHILD_MARKER}`, // child marker added to content
                        [
                            ...TChildren,
                            Child["node"]
                        ]>
                // Failure on child node
                    : TakeNestedString<Rest, TNesting, Head, Increment<TLevel>> extends infer E extends Error
                        ? E extends Err<"unbalanced/throw"> & { level: number; enterChar: string }
                            ? ErrContext<
                                E,
                                { subType: "caught"; message: `the content -- '${TParse}' -- passed into level ${E["level"]} was unbalanced because the exit character(s) associated with the enter character '${E["enterChar"]}' was not found!` }
                            >
                            : ErrContext<
                                E,
                                { parentContext: TContent; parentParse: TParse }
                            >
                        : Err<
                            `invalid-node`,
                            `Call to TakeNestedString<..> did not produce a recognized type; should have been an Error or a { node, rest } object.`,
                            { node: TakeNestedString<Rest, TNesting, Head, Increment<TLevel>> }
                        >
            // #endregion Entering
            // #region ConcatToContent
                : TakeNestedString<Rest, TNesting, TEnter, TLevel, `${TContent}${Head}`, TChildren>
        // #endregion
        : TLevel extends 0
            ? {
                content: TContent;
                level: TLevel;
                enterChar: TEnter;
                exitChar: ExitChar;
                children: TChildren;
            }
            : Err<
                "unbalanced/throw", // caught by parent
                ``,
                { level: TLevel; enterChar: TEnter; exitChar: ExitChar }
            >

    : never;

/**
 * **Nest**`<TContent, [TNesting]> -> NestedString`
 *
 * Adds a nesting structure to a string based on certain "entry" and "exit" characters
 * which stack or unstack nesting layers. This is useful when you want to evaluate the
 * text of a string based on it's semantic grouping.
 *
 * By default a useful `BracketNesting` strategy is used which nests based on _bracket_ characters.
 * You can express a different bracketing strategy by passing in either a `KeyValueNesting` or
 * `TupleNesting` configuration to build your own or choose from the other "named" strategies: `quotes`,
 * and `brackets-and-quotes`.
 *
 * The output of this utility is an _array_ of `NestedString` types; all of which start at level 0. The
 * `NestedString` type then exposes the `children` property to move hierarchically into deeper levels.
 *
 * ```ts
 * // [
 * //     {
 * //       content: "Hello", enterChar: null, exitChar: null, level: 0,
 * //       children: [{ content: "hi", enterChar: "(", exitChar: ")", level: 1, children: [] }]
 * //     },
 * //     { content: " World", enterChar: null, exitChar: null, level: 0, children: [] }
 * // ]
 * type Test = Nest<"Hello(hi) World">;
 * ```
 *
 * **Related:** `FilterByNestingLevel`
 */
export type Nest<
    TContent extends string,
    TNesting extends Nesting = BracketNesting
> = string extends TContent
    ? NestedString[] | Err<"unbalanced">
    : TakeNestedString<
        TContent,
        TNesting,
        null,
        0
    >;
