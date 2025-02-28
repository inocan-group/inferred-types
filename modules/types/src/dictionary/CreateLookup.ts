import type { ObjectKey } from "../base-types/ObjectKey";
import type { AfterFirst, First } from "../lists";
import type { ExpandRecursively } from "../literals/ExpandRecursively";
import type { AsString } from "../type-conversion/AsString";

type Process<
    TPayload extends readonly Record<ObjectKey, unknown>[],
    TKeyProp extends string,
    TValProp extends string,
    TOutput extends Record<ObjectKey, unknown> = NonNullable<unknown>,
> = [] extends TPayload
    ? TOutput
    : TKeyProp extends keyof First<TPayload>
        ? TValProp extends keyof First<TPayload>
            ? Process<
                AfterFirst<TPayload>,
                TKeyProp,
                TValProp,
                First<TPayload>[TKeyProp] extends ObjectKey
                    ? TOutput & Record<
                        First<TPayload>[TKeyProp],
                        First<TPayload>[TValProp]
                    >
                    : TOutput & Record<
                        AsString<First<TPayload>[TKeyProp]>,
                        First<TPayload>[TValProp]
                    >
            >
            : Process<
                AfterFirst<TPayload>,
                TKeyProp,
                TValProp,
                TOutput
            >
        : Process<
            AfterFirst<TPayload>,
            TKeyProp,
            TValProp,
            TOutput
        >;

/**
 * **CreateLookup**
 *
 * Creates a dictionary lookup from a Tuple of similarly typed objects.
 */
export type CreateLookup<
    TPayload extends readonly Record<ObjectKey, unknown>[],
    TKeyProp extends string,
    TValProp extends string,
> = ExpandRecursively<
    Process<
        TPayload,
        TKeyProp,
        TValProp
    >
>;
