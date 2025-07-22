import type {
    IsUnion,
    Narrowable,
} from "inferred-types/types";

/**
 * A TypeGuard which was generated from `isEqual()` runtime util.
 */
export type EqualTo<
    _A,
> = <TValue extends Narrowable>(
    value: TValue
) => boolean;

type Returns<
    TVal,
    TBase extends readonly Narrowable[],
> = IsUnion<TVal> extends true
    ? TVal & TBase[number]

    : TVal extends TBase[number]
        ? TVal
        : IsUnion<TVal> extends true
            ? TVal
            : never;

function compare<
    TBase extends readonly Narrowable[],
>(base: TBase) {
    return (
        value: unknown,
    ): value is TBase[number] => {
        return base.includes(value as any);
    };
}

/**
 * **isEqual**(compareTo)(value)
 *
 * Higher order type guard to detect whether two values are equal
 */
export function isEqual<
    TBase extends readonly N[],
    N extends Narrowable,
>(...base: TBase) {
    return compare(base);
}
