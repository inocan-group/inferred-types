import { As, Decrement, DefaultNesting, Err,  Get,  Increment,  IsNestingStart,  Last,  Length,  MergeObjects,  Nesting, NestingKeyValue, NestingTuple } from "inferred-types/types";

export type NestedString = {
    content: string;
    enterChar: null | string;
    exitChar: null;
    children: NestedString[];
    level: number;
}

type END = 1;

/**
 * the ending character (to move down a level), based on the current state
 */
type EndChar<
    TNesting extends Nesting,
    TStack extends NestedString
> = TNesting extends infer KeyValue extends NestingKeyValue
? TStack["enterChar"] extends null
    ? never
    : TStack["enterChar"] extends keyof KeyValue
        ? KeyValue[TStack["enterChar"]]
    : never
: TNesting extends infer Tuple extends NestingTuple
    ? Tuple[END]
    : never

;

/**
 * tests whether `TChar` is a valid ending token for the nesting strategy.
 */
type IsNestingEnd<
    TChar extends string,
    TNesting extends Nesting,
    TStack extends NestedString,
> = TChar extends EndChar<TNesting, TStack>
    ? true
    : false;

type CurrentLevel<T extends NestedString> = As<
T["children"] extends []
    ? T["level"]
    : CurrentLevel<Last<T["children"]>>,
number
>

type X = As<{
    content: "hi",
    enterChar: null,
    exitChar: null,
    level: 0,
    children: [
        As<{ content: "bye", enterChar: null, exitChar: null, level: 1, children: [] }, NestedString>,
        As<{ content: "bye", enterChar: null, exitChar: null, level: 1, children: [] }, NestedString>
    ]
}, NestedString>;

type L = LatestDotPath<X>;

type G = Get<X, "children.1">;

/** get a DotPath to the latest NestedString */
type LatestDotPath<
    TStack extends NestedString,
    TDotpath extends string = ""
> = CurrentLevel<TStack> extends infer Level extends number
? TStack["level"] extends Level
    ? TDotpath
    : LatestDotPath<
        Last<TStack["children"]>,
        `${TDotpath}.children.${Decrement<Length<TStack["children"]>>}`
    >
: never;

type PushChild<
    TStack extends NestedString,
    TChild extends Omit<NestedString, "level">
> = AddChildAtLevel<
    TStack,
    CurrentLevel<TStack>,
    MergeObjects<TChild,


export type Nest<
    TContent extends string,
    TNesting extends Nesting = DefaultNesting,
    TWaiting extends string = "",
    TStack extends NestedString = { content: ""; enterChar: null; exitChar: null; children: []; level: 0 },
    TResult extends readonly NestedString[] = []
> = TContent extends `${infer Head extends string}${infer Rest extends string}`
    ? IsNestingEnd<Head, TNesting, TStack> extends true
        ? TStack["level"] extends 0
            ? Err<"unbalanced/negative">
        : Nest<
            Rest,
            TNesting,
            "",
            {
                content: "",
                enterChar: null,
                exitChar: null,
                children: [],
                level: Decrement<TStack["level"]>
            },
            [
                ...TResult,
                As<{
                    content: TWaiting,
                    enterChar: TStack["enterChar"],
                    exitChar: Head,
                    children: TStack["children"],
                    level: TStack["level"]
                }, NestedString>
            ]
        >
    : IsNestingStart<Head, TNesting> extends true

        ? Nest<
            Rest,
            TNesting,
            "",
            PushChild<TStack, {
                content: TWaiting,
                enterChar: Head,
                exitChar: null,
                children: []
            }>,
            TResult
        >
