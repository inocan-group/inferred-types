import type {
    Err,
    FromInputToken__String,
    IsWideString,
    Join,
    NestedSplit,
    RetainAfter,
    Trim,
    Unset,
    WhenErr
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

type InnerRest = { inner: string; rest: string };

type Segment<
    T extends string,
    S extends readonly string[] = NestedSplit<
        RetainAfter<T, "Array<">,
        ">"
    >
> = IsWideString<T> extends true
    ? InnerRest | Error
    : S extends [ infer I extends string, ...infer REST extends [string, ...string[]]]
        ? {
            inner: Trim<I>;
            rest: Trim<Join<REST>>;
        }
        : Err<
            `invalid-token/array`,
        `An array token is missing the terminating '>' character: ${Trim<T>}`
        >;

type Type<
    T extends string,
    S = Segment<T>
> = IsWideString<T> extends true
    ? unknown | Error
    : S extends InnerRest
        ? WhenErr<
            FromInputToken__String<S["inner"]>,
            {
                subType: "array";
                in: `Array<${S["inner"]}>`;
                rest: S["rest"];
            }
        >
        : never;

type Parse<
    T extends string,
> = Segment<T> extends Error
    ? Segment<T>
    : Type<T> extends Error
        ? Type<T>
        : Array<Type<T>>;

type Rest<
    T extends string,
> = Segment<T> extends InnerRest
    ? Segment<T>["rest"]
    : "";

/**
 * pulls an `Array<...>` token from an `InputToken`
 */
export type IT_TakeArray<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = IsWideString<T> extends true
    ? unknown | Error | Unset
    : Trim<T> extends `Array<${string}`
        ? Parse<T> extends Error
            ? Parse<T>
            : FromInputToken__String<
                Rest<T>,
                [ ...TInner, Parse<T> ],
                TContainers
            >

        : Unset;

// DEBUG
// type T = "Array<string | number>";
// type TSegment = Segment<T>;
// type TType = Type<T>;
// type TParse = Parse<T>;
// type TTest = Success<Type<string>>;
