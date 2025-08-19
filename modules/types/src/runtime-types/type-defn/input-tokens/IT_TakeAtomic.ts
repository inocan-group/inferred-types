import type {
    As,
    Err,
    IT_TakeOutcome,
    IT_Token,
    RetainAfter,
    RetainUntil,
    StringKeys,
    Suggest,
    Trim,
    Whitespace
} from "inferred-types/types";

/**
 * token to type mapping for atomics
 */
type AtomicMap = {
    string: string;
    number: number;
    bigint: bigint;
    boolean: boolean;
    true: true;
    false: false;
    null: null;
    undefined: undefined;
    void: void;
    unknown: unknown;
    any: any;
    object: object;
    Object: object;
};

/**
 * **IT_AtomicToken**
 *
 * The input tokens categorized as "atomic" based on their only having one state with
 * no variants.
 */
export type IT_AtomicToken = StringKeys<AtomicMap>[number];

/**
 * **IT_TakeAtomic**`<T>`
 *
 * Tries to locate atomic tokens at the _head_ of the token string
 * and extract them.
 */
export type IT_TakeAtomic<T extends Suggest<IT_AtomicToken>> = As<
    [
        RetainUntil<T, Whitespace>,
        RetainAfter<T, Whitespace>
    ] extends [ infer Atom extends string, infer Rest extends string ]
        ? Atom extends keyof AtomicMap
            ? As<
                {
                    __kind: "IT_Token";
                    kind: "atomic";
                    token: Trim<Atom>;
                    type: AtomicMap[Atom];
                    rest: Trim<Rest>;
                },
                IT_Token<"atomic">
            >

            : Err<`wrong-handler/atomic`, `The candidate token '${Atom}' is not an atomic token.`>
        : Err<`wrong-handler/atomic`>,

    IT_TakeOutcome<"atomic">
>;
