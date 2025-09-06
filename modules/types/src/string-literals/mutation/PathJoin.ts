import type {
    First,
    Join,
    Last,
} from "inferred-types/types";

export type StripSlash<
    T extends readonly string[],
> = {
    [K in keyof T]: T[K] extends `/${infer Middle}/`
        ? Middle
        : T[K] extends `/${infer Trailing}`
            ? Trailing
            : T[K] extends `${infer Leading}/`
                ? Leading
                : T[K]
};

type Process<
    TPath extends string,
    TFirst extends string,
    TLast extends string,
>
    = TFirst extends `/${string}`
        ? TLast extends `${string}/`
            ? `/${TPath}/`
            : `/${TPath}`
        : TLast extends `${string}/`
            ? `${TPath}/`
            : TPath;

/**
 * **PathJoin**`<T,U>`
 *
 * Type utility meant to bring 2 or more "path" strings together into
 * a valid "path". Where a "path" is represented as nothing more than
 * string characters delimited by a Posix `/` character.
 *
 * Note that the first part of the path will retain it's `/` if present
 * and the last one will preserve it's `/` character if present. You can
 * combine this utility with `EnsureTrailing<T>`, `StripTrailing<T>`,
 * `EnsureStarting<T>`, and `StripStarting<T>` to further shape
 * the type.
 */
export type PathJoin<
    TSegments extends readonly string[],
> = StripSlash<TSegments> extends readonly string[]
    ? Process<
        Join<StripSlash<TSegments>, "/">,
        First<TSegments>,
        Last<TSegments>
    >
    : never;
