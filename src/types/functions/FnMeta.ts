import { AnyFunction, Dictionary, IsNarrowingFn, IsObjectLiteral } from "src/types/index";




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
  TProps extends Dictionary,
  TFn extends AnyFunction
> = {
  fn: TFn;
  args: TArgs;
  returns: TReturn;
  props: TProps;
  hasProps: [IsObjectLiteral<TProps>] extends [true] ? true : false;
  hasArgs: TArgs["length"] extends 0 ? false : true;
  isNarrowingFn: IsNarrowingFn<TFn>;
};
