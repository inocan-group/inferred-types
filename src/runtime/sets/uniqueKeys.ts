import { Container, UniqueKeys } from "../../types/base";
import { isArray, toNumber } from "src/runtime";

/**
 * **uniqueKeys**(left, right)
 * 
 * Returns a strongly typed `LeftRight` tuple which identifies the
 * unique keys for each participant list passed in.
 */
export const uniqueKeys = <
  L extends Container,
  R extends Container,  
>(left: L, right: R): UniqueKeys<L,R> => {
  const isNumeric = isArray(left) && isArray(right)
    ? true
    : false;

  if (
    (isArray(left) && !isArray(right)) ||
    (isArray(right) && !isArray(left))
  ) {
      throw new Error("uniqueKeys(l,r) given invalid comparison; both left and right values should be an object or an array but not one of each!");
  }
  const l = isNumeric 
    ? toNumber(Object.keys(left)) as PropertyKey[]
    : Object.keys(left);
  const r = isNumeric
    ? toNumber(Object.keys(right)) as PropertyKey[]
    : Object.keys(right);
  
  return [
    "LeftRight",
    l.filter(i => !r.includes(i)),
    r.filter(i => !l.includes(i))
  ] as unknown as UniqueKeys<L,R>;
};
