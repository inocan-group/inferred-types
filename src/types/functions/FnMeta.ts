import {  IndexableObject } from "src/types/index";

/**
 * **FnMeta**<TArgs,TReturn,TProps>
 * 
 * The meta-information around a given function. Represented as an
 * object with the following properties:
 * 
 * 1. `args` - the array of arguments the function expects
 * 2. `returns` - the return type of the function
 * 3. `props` - any Key/Value props also packaged with the function, if no
 * key/values are found it will be set to `no-props`.
 */
export type FnMeta<
  TArgs extends readonly unknown[],
  TReturn,
  TProps extends IndexableObject | "no-props"
> = {
  args: TArgs;
  returns: TReturn;
  props: TProps;
};
