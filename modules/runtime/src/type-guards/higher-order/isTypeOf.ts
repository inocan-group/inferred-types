import type { ConvertTypeOf, TypeOf } from "inferred-types/types";

export type TypeOfTypeGuard<
    TType extends TypeOf,
> = <TValue>(value: TValue) => value is TValue & ConvertTypeOf<TType>;

/**
 * **isTypeOf**(type)(value)
 *
 * Higher order type guard which matches against the runtime operator's `typeof` command.
 *
 * - You first partially apply by specifying the `typeof`
 * - The type guard is then returned based on the type.
 */
export function isTypeOf<
    TType extends TypeOf,
>(type: TType): TypeOfTypeGuard<TType> {
    return <TValue>(value: TValue): value is TValue & ConvertTypeOf<TType> => {
        // eslint-disable-next-line valid-typeof
        return typeof value === type;
    };
}
