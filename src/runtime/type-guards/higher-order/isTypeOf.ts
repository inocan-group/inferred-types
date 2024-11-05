import { TypeOf, ConvertTypeOf } from "inferred-types/dist/types/index";

export type TypeOfTypeGuard<TType extends TypeOf> = <TValue>(value: TValue)=> value is TValue & ConvertTypeOf<TType>;

/**
 * **isTypeOf**(type)(value)
 *
 * Higher order type guard which matches against the runtime operator's `typeof` command.
 *
 * - You first partially apply by specifying the `typeof`
 * - The type guard is then returned based on the type.
 */
export const isTypeOf = <TType extends TypeOf>(type: TType): TypeOfTypeGuard<TType> =>
  <TValue>(value: TValue): value is TValue & ConvertTypeOf<TType> => {
  return typeof value === type;
};
