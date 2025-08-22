import type {
    As,
    DefaultNesting,
    IsNestingStart,
    Nesting
} from "inferred-types/types";

export type NestedString = {
    content: string;
    enterChar: string | null;
    exitChar: string | null;
    children: NestedString[];
    level: number;
};

// Simplified recursive parsing
type ParseSegment<
    TContent extends string,
    TNesting extends Nesting,
    TAccumulated extends string = ""
> = TContent extends `${infer Head}${infer Rest}`
    ? IsNestingStart<Head, TNesting> extends true
        ? ParseNested<Rest, TNesting, Head> extends { content: infer NestedContent extends string; rest: infer Remaining extends string }
            ? [
                As<{
                    content: TAccumulated;
                    enterChar: null;
                    exitChar: null;
                    level: 0;
                    children: [
                        As<{
                            content: NestedContent;
                            enterChar: Head;
                            exitChar: GetEndChar<Head, TNesting>;
                            level: 1;
                            children: [];
                        }, NestedString>
                    ];
                }, NestedString>,
                ...ParseSegment<Remaining, TNesting>
            ]
            : ParseSegment<Rest, TNesting, `${TAccumulated}${Head}`>
        : ParseSegment<Rest, TNesting, `${TAccumulated}${Head}`>
    : TAccumulated extends ""
        ? []
        : [
            As<{
                content: TAccumulated;
                enterChar: null;
                exitChar: null;
                level: 0;
                children: [];
            }, NestedString>
        ];

// Parse content between matching delimiters
type ParseNested<
    TContent extends string,
    TNesting extends Nesting,
    TStartChar extends string,
    TAccumulated extends string = ""
> = TContent extends `${infer Head}${infer Rest}`
    ? Head extends GetEndChar<TStartChar, TNesting>
        ? { content: TAccumulated; rest: Rest }
        : ParseNested<Rest, TNesting, TStartChar, `${TAccumulated}${Head}`>
    : never;

// Get the ending character for a start character
type GetEndChar<TStart extends string, TNesting extends Nesting>
    = TNesting extends Record<string, string>
        ? TStart extends keyof TNesting
            ? TNesting[TStart]
            : never
        : never;

/**
 * **Nest**`<TContent, [TNesting]>`
 *
 * Adds a nesting structure to a string based on certain "entry" and "exit" characters
 * which stack or unstack nesting layers. This is useful when you want to evaluate the
 * text of a string based on it's semantic grouping.
 *
 * By default a useful `DefaultNesting` strategy is used which nests based on characters
 * such as:
 *
 * - `{` enters a new stack, `}` extends that stack
 * - `(` enters a new stack, `)` extends that stack
 */
export type Nest<
    TContent extends string,
    TNesting extends Nesting = DefaultNesting
> = ParseSegment<TContent, TNesting>;
