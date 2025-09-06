import type { As, AsNumber, AsStringUnion, IsWideType } from "inferred-types/types";

type Process<
    TContent extends string,
    TLeading extends string | number,
    TTrailing extends string | number,
> = TContent extends `${TLeading}${infer Remaining}`
    ? Remaining extends `${infer Remaining}${TTrailing}`
        ? Remaining
        : Remaining
    : TContent extends `${infer Remaining}${TTrailing}`
        ? Remaining
        : TContent;

/**
 * **StripSurround**`<TContent, TSurround>`
 *
 * Strips the content found in `TSurround` from the leading or trailing
 * edge of the content passed in as `TContent`.
 *
 * ```ts
 * // "Hi there"
 * type Hello = StripSurround<"(Hi there)", "(" | ")">;
 * ```
 *
 * @deprecated use `StripSurrounding` instead
 */
export type StripSurround<
    TContent extends string | number,
    TSurround extends string | number,
> = IsWideType<TContent> extends true
    ? TContent
    : TContent extends string
        ? Process<TContent, AsStringUnion<TSurround>, AsStringUnion<TSurround>>
        : AsNumber<
            Process<`${TContent}`, AsStringUnion<TSurround>, AsStringUnion<TSurround>>
        >;

/**
 * **StripSurrounding**`<TContent, TSurround>`
 *
 * Strips the content found in `TSurround` from the leading or trailing
 * edge of the content passed in as `TContent`.
 *
 * - you can express `TSurround` as either a single `single|number` type (unions are allowed)
 * - or alternatively you can provide a tuple `[leading, trailing]` when you want to have
 * different/discrete types to look for the leading versus trailing character(s).
 *
 * ```ts
 * // "Hi there"
 * type Hello = StripSurrounding<"(Hi there)", "(" | ")">;
 * type Hello2 = StripSurrounding<"(Hi there)", ["(",  ")"]>;
 * ```
 */
export type StripSurrounding<
    TContent extends string | number,
    TSurround extends string | number | [ string | number, string | number ]
> = As<
    [string] extends [TContent]
        ? string
        : [number] extends [TContent]
            ? number | string
            : [TSurround] extends [[ infer Leading extends string | number, infer Trailing extends string | number ]]
                ? [TContent] extends [number]
                    ? AsNumber<Process<`${TContent}`, Leading, Trailing>>
                    : [TContent] extends [string]
                        ? Process<TContent, Leading, Trailing>
                        : never
                : [TContent] extends [number]
                    ? AsNumber<
                        Process<`${TContent}`, As<TSurround, string | number>, As<TSurround, string | number>>
                    >
                    : [TContent] extends [string]
                        ? Process<TContent, As<TSurround, string | number>, As<TSurround, string | number>>
                        : never,

    TContent extends string ? string : number
>;
