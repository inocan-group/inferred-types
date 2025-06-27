import type {
    Concat,
    DashUppercase,
    If,
    IsTrue,
    LeftWhitespace,
    LowerAllCaps,
    RightWhitespace,
    Trim,
} from "inferred-types/types";

/** convert space to dash */
type SpaceToDash<T extends string> = T extends `${infer Begin}${" "}${infer Rest}`
    ? SpaceToDash<`${Begin}-${Rest}`>
    : T;

type Process<
    T extends string,
    TPreserve extends boolean = false,
> = If<
    IsTrue<TPreserve>,
    string extends T
        ? string
        : DashUppercase<
            Uncapitalize<SpaceToDash<Trim<LowerAllCaps<T>>>
            >
        > extends `${infer Begin extends string}${"-"}${infer Rest extends string}`
            ? Concat<[
                LeftWhitespace<T>,
    `${Lowercase<Begin>}_${Rest}` extends string
        ? Process<`${Lowercase<Begin>}_${Rest}`>
        : never,
    RightWhitespace<T>,
            ]>
            : Concat<[
                LeftWhitespace<T>,
                Lowercase<DashUppercase<Uncapitalize<LowerAllCaps<T>>>>,
                RightWhitespace<T>,
            ]>,
    string extends T
        ? string
        : DashUppercase<
            Uncapitalize<SpaceToDash<Trim<LowerAllCaps<T>>>>
        > extends `${infer Begin}${"-"}${infer Rest}`
            ? Trim<Process<`${Lowercase<Begin>}_${Rest}`>>
            : Trim<Lowercase<DashUppercase<Uncapitalize<LowerAllCaps<T>>>>>
>;

/**
 * **SnakeCase**`<TString,TPreserve>`
 *
 * Converts a string literal type to _snake_case_ and optionally preserves
 * surrounding whitespace.
 * ```ts
 * // "foo_bar"
 * type T = SnakeCase<"fooBar">;
 * type T = SnakeCase<"\n foo bar \t">;
 * ```
 */
export type SnakeCase<
    T extends string | readonly unknown[],
    TPreserve extends boolean = false,
> = T extends string
    ? Process<T, TPreserve>
    : {
        [K in keyof T]: T[K] extends string
            ? SnakeCase<T[K]>
            : T[K]
    };
