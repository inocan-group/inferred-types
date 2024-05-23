/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import type { 
  AnyObject, 
  IsTrue,
  If,
  JustFunction,
  TypedFunction
} from "src/types/index";



/**
 * **FnWithDict**`<TFn,TProps,[TClone]>`
 * 
 * Represents any function which is intersected with a dictionary of KV's.
 * 
 * **Related**: `SimpleFn`, `NarrowableFn`, `AnyFunction`, `IsFunctionWithDict`
 */
export type FnWithDict<
  TFn extends TypedFunction,
  TProps extends AnyObject,
  TClone extends boolean | null | undefined = true
> = If<
  IsTrue<TClone>,
  JustFunction<TFn> & TProps,
  TFn & TProps 
>;
