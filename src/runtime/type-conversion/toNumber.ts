import { Narrowable, Scalar, ToNumber } from "src/types/index";



const convertScalar = <T extends Narrowable>(val: T) => {
  switch (typeof val) {
    case "number":
      return val;
    case "string":
      return Number(val);
    case "boolean":
      return val ? 1 : 0;
    default:
      throw Error(`${typeof val} is an invalid scalar type to convert to a number!`);
  }
};
const convertList = <T extends readonly Scalar[]>(val: T) => val.map(i => convertScalar(i));

/**
 * **toNumber**(value)
 * 
 * Runtime utility which converts a value into a _numeric_ variant:
 * 
 * - for scalars (and objects) it will try to convert to number but otherwise returns `NaN` to runtime and `never` to type system
 * - for arrays it will iterate over each element and try to convert to a number like above
 */
export function toNumber<
  T extends Narrowable
>(value: T): ToNumber<T> {
  return (
    Array.isArray(value)
    ? convertList(value)
    : convertScalar(value)
  ) as ToNumber<T>;
}
