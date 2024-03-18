/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import { Container,   Narrowable,  ObjectKey,  UniqueKeys } from "src/types/index";
import { isArray } from "../type-guards/isArray";
import { toNumber } from "../type-conversion/toNumber";

/**
 * **uniqueKeys**(left, right)
 * 
 * Returns a strongly typed `LeftRight` tuple which identifies the
 * unique keys for each participant list passed in.
 */
export const uniqueKeys = <
  L extends Container<VL>,
  R extends Container<VR>,
  VL extends Narrowable,
  VR extends Narrowable
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

  const l = (
    isNumeric 
    ? toNumber(Object.keys(left)) 
    : Object.keys(left)
  ) as ObjectKey[];
  const r = (
    isNumeric
    ? toNumber(Object.keys(right)) 
    : Object.keys(right)
  ) as ObjectKey[];

  if (isNumeric) {
    throw new Error("uniqueKeys does not yet work with tuples")
  }

  const leftKeys = l.filter(i => !r.includes(i));
  const rightKeys = r.filter(i => !l.includes(i));
  
  return [
    "LeftRight",
      leftKeys,
      rightKeys
  ] as unknown as UniqueKeys<L,R>;
};
