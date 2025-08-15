import type {
    Narrowable,
} from "inferred-types/types";



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
