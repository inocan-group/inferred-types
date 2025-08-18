import type {
    Contains,
    Err,
    FromInputToken__String,
    Join,
    NestedSplit,
    StripLeading,
    StripTrailing,
    Trim,
    Unset,
    WhenErr
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens";

/**
 * isolates based on explicit `Generator<...>` definition syntax
 */
type IsolateGenerator<
    T extends string,
    I = NestedSplit<
        StripLeading<Trim<T>, `${"Async" | ""}Generator<`>,
        ">"
    >
> = I extends readonly [infer Gen extends string, ...string[]]
    ? Gen
    : never;

/** The REST of the Token after an explicit Generator/AsyncGenerator token */
type GeneratorRest<
    T extends string,
    I = NestedSplit<
        StripLeading<Trim<T>, `${"Async" | ""}Generator<`>,
        ">"
    >
> = I extends readonly [string, infer Rest extends readonly string[]]
    ? Trim<Join<Rest>>
    : never;

/**
 * Parse the types expressed in the Generator type
 */
type ParseGenerator<
    T extends string,
    P = NestedSplit<
        StripLeading<Trim<T>, `${"Async" | ""}Generator<`>,
        ","
    >
> = P extends [infer A extends string, infer B extends string, infer C extends string]
    ? [
        FromInputToken__String<Trim<A>>,
        FromInputToken__String<Trim<B>>,
        StripTrailing<Trim<C>, ">"> extends infer TrimC extends string
            ? FromInputToken__String<TrimC>
            : never
    ]
    : never;

type FinalizeGenerator<
    T extends string,
    P = ParseGenerator<T>
> = P extends readonly [infer A, infer B, infer C]
    ? Contains<T, "AsyncGenerator"> extends true
        ? AsyncGenerator<A, B, C> extends Error
            ? WhenErr<AsyncGenerator<A, B, C>, { subType: "generator" }>
            : AsyncGenerator<A, B, C>
        : Generator<A, B, C> extends Error
            ? WhenErr<Generator<A, B, C>, { subType: "generator" }>
            : Generator<A, B, C>
    : Err<`invalid-token/generator`, `Unable to infer generator types: ${Trim<T>}`>;

export type IT_TakeGenerator<
    T extends string,
    TInner extends readonly unknown[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `${"Async" | ""}Generator<${string}`
    ? ParseGenerator<T> extends Error
        ? WhenErr<ParseGenerator<T>, { subType: "generator" }>
        : FinalizeGenerator<T> extends Error
            ? FinalizeGenerator<T>
            : FromInputToken__String<
                GeneratorRest<T>,
                [...TInner, FinalizeGenerator<T>],
                TContainers
            >
    : Trim<T> extends `${string}function* ${string}(`
        ? Err<`invalid-token/generator`, "runtime syntax not ready", { generator: IsolateGenerator<T> }>
        : Unset;

// DEBUG GENERATOR
// type T = "function* fooBar(name: string) => string";
// type TParams = IsolateParams<T>;
// type TName = IsolateName<T>;

// type G = "Generator<number, string, boolean> | function";
// type GIsolate = IsolateGenerator<G>;
// type GRest = GeneratorRest<G>;
// type GParse = ParseGenerator<G>;
// type GFinalize = FinalizeGenerator<G>;
// type GTake = IT_TakeGenerator<G>;

// type AG = "AsyncGenerator<number, string, boolean>";
// type AGIsolate = IsolateGenerator<AG>;
// type AGRest = GeneratorRest<AG>;
// type AGParse = ParseGenerator<AG>;
// type AGFinalize = FinalizeGenerator<AG>;
// type AGTake = IT_TakeGenerator<AG>;
