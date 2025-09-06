import type { As, Container, Dictionary, Err, Values } from "inferred-types/types";

/**
 * The results produced by the `IsolateErrors<T,U>` utility
 */
export type IsolatedResults = {
    successes: readonly unknown[];
    errors: readonly Error[];
    otherErrors: readonly Error[];
};

type CheckArray<
    T extends readonly unknown[],
    U extends string | undefined,
    R extends IsolatedResults = { successes: []; errors: []; otherErrors: [] }
> = T extends readonly [infer Head, ...infer Rest]
    ? Head extends Error
        ? U extends string
            ? CheckArray<
                Rest,
                U,
                As<
                    Head extends Err<U>
                        ? {
                            successes: R["successes"];
                            errors: [...R["errors"], Head];
                            otherErrors: R["otherErrors"];
                        }
                        : {
                            successes: R["successes"];
                            errors: R["errors"];
                            otherErrors: [...R["otherErrors"], Head];
                        },
                    IsolatedResults
                >
            >
            : CheckArray<
                Rest,
                U,
                As<
                    {
                        successes: R["successes"];
                        errors: [...R["errors"], Head];
                        otherErrors: R["otherErrors"];
                    },
                    IsolatedResults
                >
            >
        : CheckArray<
            Rest,
            U,
            As<
                {
                    successes: [...R["successes"], Head];
                    errors: R["errors"];
                    otherErrors: R["otherErrors"];
                },
                IsolatedResults
            >
        >
    : R;

type CheckDictionary<T extends Dictionary, U extends string | undefined> = CheckArray<
    Values<T>,
    U
>;

/**
 * **IsolateErrors**`<T>`
 *
 * Isolates error's from successful outcomes in the _values_ of `T`.
 *
 * - When `U` is unset then you will be returned a dictionary with `successes` and `errors` properties.
 * - When `U` **is** set then it represents a type/subtype of the error. The result this utility
 * returns is `successes`, `errors`, and `otherErrors` (for errors which were found but not errors
 * of the specified type)
 */
export type IsolateErrors<
    T extends Container,
    U extends string | undefined = undefined
> = T extends readonly unknown[]
    ? CheckArray<T, U>
    : T extends Dictionary
        ? CheckDictionary<T, U>
        : never;



