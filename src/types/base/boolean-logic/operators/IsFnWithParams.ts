import type { AnyObject, AnyFunction , IsEmptyObject, IfEqual, IfAnd, DoesExtend } from "../..";

/**
 * **IsFnWithParams**`<TFn, [TParamMatch]>`
 * 
 * Checks whether `T` is a function which also includes 
 * dictionary props sitting alongside the function.
 * 
 * - the optional `TParamMatch` will ensure that this generic _extends_
 * the params included in the function.
 */
export type IsFnWithParams<
  TFn, 
  TParamMatch extends AnyObject | undefined = undefined
> = TFn extends AnyFunction
    ? IsEmptyObject<TFn> extends true 
        ? false 
        : // there are some props on TFn
          IfAnd<
            [
              // the Fn extends the param matcher
              DoesExtend<TFn, TParamMatch>,
              // TParamMatch is set
              DoesExtend<TParamMatch, AnyObject>, 
            ], 
            true,
            IfEqual<TParamMatch, undefined, true, false>
        >
    : false;
