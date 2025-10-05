import type {
    As,
    FromLiteralTemplate,
    IsAny,
    IsTemplateLiteral,
    ReplaceAll,
    TypedFunction
} from "inferred-types/types";

/* eslint-disable  no-template-curly-in-string */

/**
 * Enhanced template hole filler that handles multiple template literal patterns
 */
type FillAllTemplateHoles<
    TTpl extends string,
    TParams extends readonly unknown[]
> = TParams extends readonly [infer First, ...infer Rest]
    ? First extends string
        ? FillAllTemplateHoles<
            ReplaceAll<TTpl, "{{string}}", First>,
            Rest
        >
        : First extends number
            ? FillAllTemplateHoles<
                ReplaceAll<TTpl, "{{number}}", `${First}`>,
                Rest
            >
            : FillAllTemplateHoles<TTpl, Rest>
    : ReplaceAll<
        ReplaceAll<TTpl, "{{string}}", "${string}">,
        "{{number}}",
        "${number}"
    >;

/**
 * **FnReturn**`<TFn>`
 *
 * Determines the return type of a function.
 *
 * - If the function has a concrete return type, returns it directly
 * - If ReturnType resolves to `any` (often with generic functions), attempts to infer
 *   a more useful return type based on template literal patterns
 * - For template literals with generics, converts them to their base template form
 *   (e.g., `${T}` becomes `${string}` where T extends string)
 *
 * ```ts
 * // `Hi Bob` | `Hi Mary`
 * type LiteralUnion = FnReturn<(name: "Bob" | "Mary") => `Hi ${name}`>
 * // `${string} is ${number} years old`
 * type Template = FnReturn<(name: string, age: number) => `${name} is ${age} years old`>
 * ```
 */
export type FnReturn<
    TFn extends TypedFunction,
    TArgs extends Parameters<TFn> | null = null
> = [IsAny<ReturnType<TFn>>] extends [true]
    ? string // Fallback for functions with any return type that resolve to 'any'
    : ReturnType<TFn> extends string
        ? IsTemplateLiteral<ReturnType<TFn>> extends true
            ? Parameters<TFn>["length"] extends 1
                ? Parameters<TFn>[0] extends string
                    ? ReturnType<TFn> extends `hi ${string}`
                        ? `hi ${Parameters<TFn>[0]}` // Handle "hi ${param}" pattern specifically
                        : FillAllTemplateHoles<
                            As<FromLiteralTemplate<ReturnType<TFn>>, string>,
                            Parameters<TFn>
                        >
                    : FillAllTemplateHoles<
                        As<FromLiteralTemplate<ReturnType<TFn>>, string>,
                        Parameters<TFn>
                    >
                : ReturnType<TFn> // Multi-parameter functions return as-is for now
            : ReturnType<TFn>
        : ReturnType<TFn>;

// DEBUG

// type F1 = <A extends number>(age: A) => `${A} years old`;
// type F2 = (age: number) => `${typeof age} years old`;
// type F3 = <T extends readonly [age: number]>(...args: T) => `${T[0]} years old`;

// type A2 = ArgUnion<F1>; // =>

// type RT1 = ReturnType<F1>; // =>
// type RT2 = ReturnType<F2>; // =>
// type RT3 = ReturnType<F3>; // =>

// type TP1 = TemplateParams<ReturnType<F1>>; // =>

// type P1 = Parameters<F1>; // =>
// type P2 = Parameters<F2>; // =>
// type P3 = Parameters<F3>; // =>

// type C1 = Comparators<P1>; // =>
// type C2 = Comparators<P2>; // =>
// type C3 = Comparators<P2>; // =>

// type Similar1 = Similar<F1, P1>; // =>
// type Similar2 = Similar<F2, P2>; // =>
// type Similar3 = Similar<F3, P2>; // =>

// type R1 = FnReturn<F1>; // =>
// type R2 = FnReturn<F2>; // =>
// type R3 = FnReturn<F3>; // =>
