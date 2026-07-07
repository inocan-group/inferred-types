import type { Constant } from "inferred-types/constants";
import type {
    As,
    AsPropertyKey,
    AsString,
    Concat,
    Container,
    Dictionary,
    Err,
    If,
    IsNegativeNumber,
    IsNull,
    IsValidIndex,
    ObjectKey,
    Reverse,
    ToString,
} from "inferred-types/types";

type Override<
    TValue,
    TOverride,
> = TOverride extends Constant<"no-override">
    ? TValue
    : TValue extends Error
        ? TOverride
        : TValue;

type NegativeIndex<
    TValue extends readonly unknown[],
    TIdx extends number,
    TPositive extends number = `${TIdx}` extends `-${infer N extends number}` ? N : never,
    TDepth extends readonly unknown[] = [unknown],
> = TDepth["length"] extends TPositive
    ? TValue extends readonly [infer Head, ...readonly unknown[]]
        ? Head
        : Err<
            "invalid-index",
            `Use of a negative index [${AsString<TIdx>}] was unsuccessful in matching a valid index`,
            {
                container: TValue;
                key: TIdx;
                revIndex: TPositive;
                revContainer: Reverse<TValue>;
            }
        >
    : TValue extends readonly [unknown, ...infer Rest]
        ? NegativeIndex<Rest, TIdx, TPositive, [...TDepth, unknown]>
        : If<
        IsValidIndex<TValue, TPositive>,
        TValue[TPositive],
        Err<
            "invalid-index",
            `Use of a negative index [${AsString<TIdx>}] was unsuccessful in matching a valid index`,
            {
                container: TValue;
                key: TIdx;
                revIndex: TPositive;
                revContainer: Reverse<TValue>;
            }
        >
    >;

type HandleArr<
    TValue extends readonly unknown[],
    TIdx extends PropertyKey,
> = TIdx extends number
    ? IsNegativeNumber<TIdx> extends true
        ? NegativeIndex<Reverse<TValue>, TIdx>
        : If<
            IsValidIndex<TValue, TIdx>,
            TValue[TIdx],
            Err<
                "invalid-index",
                Concat<["Attempt to index [", ToString<TIdx>, "] into a non-container type!"]>,
                { container: TValue; key: TIdx; library: "inferred-types/constants" }
            >
        >
    : Err<
        "invalid-index",
    `IndexOf<Tuple,${AsString<TIdx>}> failed because a tuple container must use numeric indexes!`,
    { container: TValue; key: TIdx; library: "inferred-types/constants" }
    >;

type HandleObj<
    TValue extends Dictionary,
    TIdx extends PropertyKey,
> = TIdx extends keyof TValue
    ? TValue[TIdx]
    : Err<
        "invalid-index",
        Concat<["Attempt to index [", ToString<TIdx>, "] into a non-container type!"]>,
        { container: TValue; key: TIdx; library: "inferred-types/constants" }
    >;

type Process<
    TValue,
    TIdx extends PropertyKey | null,
> = If<
    IsNull<TIdx>,
    // return "as is"
    TValue,
    // dereference where valid index
    TValue extends readonly unknown[]
        ? If<
            IsValidIndex<TValue, AsPropertyKey<TIdx>>,
            HandleArr<TValue, AsPropertyKey<TIdx>>,

            Err<
                "invalid-index",
                `Call to IndexOf<DescribeType<TValue>,${AsString<TIdx>}> is not allowed as an tuple based container must receive either null or numeric index value.`,
                { library: "inferred-types/constants"; container: TValue; key: TIdx }
            >
        >
        : TValue extends Dictionary
            ? TIdx extends ObjectKey
                ? HandleObj<TValue, TIdx>
                : Err<
                    "invalid-index",
                    `Call to IndexOf<DescribeType<TValue>,${AsString<TIdx>}> is not allowed as an object based container must receive either null, a string, or a symbol index value.`,
                    { library: "inferred-types/constants"; container: TValue; key: TIdx }
                >
            : Err<
                "invalid-index",
                `IndexOf<ToString<TValue>,${AsString<TIdx>}> was called but a non-null value was used to index a non-container which will never work!`,
                { library: "inferred-types/constants"; container: TValue; key: TIdx }
            >
>;

/**
 * **IndexOf**<TValue, TIdx, [TOverride]>
 *
 * A type utility which _dereferences_ a property/index item on an array
 * or object.
 *
 * - if `TIdx` is passed in as `null` then this will act as an identity
 * function and return `TValue`.
 * - if `TIdx` is a negative number it will index in reverse for tuple based
 * containers
 *
 * **Related:** `Get`, `IsValidIndex`
 *
 * **Errors:** produces an Error when an a bad index value
 * is passed in for the given container
 */
export type IndexOf<
    TValue extends Container,
    TIdx extends PropertyKey | null,
    TOverride = Constant<"no-override">,
> = TIdx extends null
    ? TValue
    : Override<
        Process<TValue, As<TIdx, PropertyKey | null>>,
        TOverride
    >;
