import { DoesExtend } from "src/types/index";
import { Narrowable } from "src/types/literals";
import { isShape } from "./shape";




/**
 * **doesExtend**`(val,comparator)`
 * 
 * Tries to make a _type based_ comparison between to variables
 * `val` and `comparator`. However, to do a decent job you'll want 
 * the `comparator` to be a `TypeToken` formed with the `ShapeAPI`.
 * 
 * - if you have a TypeToken for a comparator then the comparison 
 * will be type perfect
 * - if you _do not_ then this simply checks for equality and that's it
 */
export const doesExtend = <
  A extends Narrowable,
  B extends Narrowable
>(val: A, comparator: B) => {
  return (val as unknown) === (comparator as unknown)
    ? true // if they equal then they extend
    : (isShape(comparator))
      ? shapeComparison(val,comparator)
      : false;
}
