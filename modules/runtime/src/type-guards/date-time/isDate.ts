
/**
* A type guard which validates whether the passed in value is a JavaScript Date object.
*/
export const isDate = (val: unknown): val is Date => {
  return val instanceof Date;
}
