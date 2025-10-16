import type {
    AfterFirst,
    And,
    Chars,
    DefaultNesting,
    Err,
    First,
    FromNamedNestingConfig,
    GetNextLevelConfig,
    GetParentConfig,
    IsGreaterThan,
    IsNestingEnd,
    IsNestingMatchEnd,
    IsNestingStart,
    IsNestingTuple,
    Join,
    Last,
    Nesting,
    NestingConfig__Named,
    Pop,
    ShallowBracketAndQuoteNesting,
    ToStringLiteral
} from "inferred-types/types";

type FindLast<
    TChars extends readonly string[],
    TFind extends string,
    TNesting extends Nesting,
    TInclude extends boolean,
    TRtn extends string = "",
    TStack extends readonly string[] = [],
    TRootNesting extends Nesting = TNesting
> = [] extends TChars
    ? TStack["length"] extends 0
        ? Err<
            `not-found/retain-until-nested`,
        `The character '${TFind}' was not found anywhere at the base level of the nesting stack!`,
        {
            find: TFind;
            content: TRtn;
            nesting: ToStringLiteral<TNesting>;
        }
        >
        : Err<
            `unbalanced/retain-until-nested`,
        `After reaching the end of the characters of the string, it appears that the nesting stack is not balanced! There are still the following items on the stack: ${Join<TStack, ", ">}`
        >
    : And<[
        First<TChars> extends TFind ? true : false,
        TStack["length"] extends 0 ? true : false
    ]> extends true
        ? [TInclude] extends [true]
            ? `${TRtn}${First<TChars>}`
            : TRtn
        : And<[
            IsNestingEnd<First<TChars>, TNesting>,
            TStack["length"] extends 1 ? true : false,
            IsNestingMatchEnd<
                First<TChars>,
                TStack,
                GetParentConfig<TStack, TRootNesting>
            >,
            First<TChars> extends TFind ? true : false
        ]> extends true
            ? [TInclude] extends [true]
                ? `${TRtn}${First<TChars>}`
                : TRtn
            : IsNestingMatchEnd<First<TChars>, TStack, GetParentConfig<TStack, TRootNesting>> extends true
                ? Pop<TStack>["length"] extends 0
                    // Exiting to root level - restore root config
                    ? FindLast<
                        AfterFirst<TChars>,
                        TFind,
                        TRootNesting,
                        TInclude,
                        `${TRtn}${First<TChars>}`,
                        Pop<TStack>,
                        TRootNesting
                    >
                    // Exiting to parent level - restore parent's next-level config
                    : FindLast<
                        AfterFirst<TChars>,
                        TFind,
                        GetNextLevelConfig<Last<Pop<TStack>>, TRootNesting>,
                        TInclude,
                        `${TRtn}${First<TChars>}`,
                        Pop<TStack>,
                        TRootNesting
                    >
                : IsNestingStart<First<TChars>, TNesting> extends true
                    // Entering nesting - switch to next-level config
                    ? FindLast<
                        AfterFirst<TChars>,
                        TFind,
                        GetNextLevelConfig<First<TChars>, TNesting>,
                        TInclude,
                        `${TRtn}${First<TChars>}`,
                        // when we have start chars but no end chars
                        // we can only have a stack depth of 1 (as max)
                        And<[
                            IsNestingTuple<TNesting>,
                            IsGreaterThan<TStack["length"], 0>
                        ]> extends true
                            ? TStack
                            : [...TStack, First<TChars>],
                        TRootNesting
                    >
                    // Regular character - continue with current config
                    : FindLast<
                        AfterFirst<TChars>,
                        TFind,
                        TNesting,
                        TInclude,
                        `${TRtn}${First<TChars>}`,
                        TStack,
                        TRootNesting
                    >;

/**
 * **RetainUntil__Nested**`<TStr, TFind, [TInclude], [TNesting]>`
 *
 * A _nesting aware_ variant of `RetainUntil`:
 *
 * - will retain characters in `TStr` until it finds `TFind`
 * at the root nesting level
 * - if `TNesting` is not defined then the `ShallowBracketAndQuoteNesting`
 * configuration will be used but any config from `Nesting` or
 * named config is valid.
 * - the `TInclude` value determines whether the `TFind` character
 * is included or not in the returned string. It defaults to true.
 * - **NEW**: Supports hierarchical nesting configurations where each
 * level can specify different tokens for the next level
 */
export type RetainUntil__Nested<
    TStr,
    TFind extends string,
    TInclude extends boolean = true,
    TNesting extends Nesting | NestingConfig__Named = ShallowBracketAndQuoteNesting,
> = TStr extends string
    ? string extends TStr
        ? string
        : FindLast<
            Chars<TStr>,
            TFind,
            FromNamedNestingConfig<TNesting>,
            TInclude,
            "",
            [],
            FromNamedNestingConfig<TNesting>
        >
    : TStr extends Error
        ? TStr
        : Err<
            "invalid-type/string",
            `The AfterLast__Nested utility was passed a non-string value to TStr!`,
            { str: TStr }
        >;
