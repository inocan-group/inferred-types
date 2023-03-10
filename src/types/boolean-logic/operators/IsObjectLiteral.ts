/* eslint-disable @typescript-eslint/ban-types */
import { AnyObject, IfEqual, IfOr, IsLength, Keys } from "src/types";

/**
 * **IsObjectLiteral**`<T>`
 * 
 * Tests whether an object is a literal by validating that either:
 * 
 * 1. the type is `{}` (a literal indicating NO props)
 * 2. there is at least one key returned by `Keys<T>`
 */
export type IsObjectLiteral<T extends AnyObject> = IfOr<
  [ IsLength<Keys<T>, 0>, IsLength<Keys<T>, number>],
  IfEqual<T, {}, true, false>,
  true
>;
