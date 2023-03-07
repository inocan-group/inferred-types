import { AnyObject } from "src/types/base-types";

/**
 * The meta-information around a given function. Represented as an
 * object with the following properties:
 * 
 * 1. `args` - the array of arguments the function expects
 * 2. `returns` - the return type of the function
 * 3. `props` - any Key/Value props also packaged with the function, if no
 * key/values are found it will be set to `no-props`.
 */
export type FnMeta<
  A extends readonly unknown[],
  R,
  D extends AnyObject | "no-props"
> = {
  args: A;
  returns: R;
  props: D;
};
