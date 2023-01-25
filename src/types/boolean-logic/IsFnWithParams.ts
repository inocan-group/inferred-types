import { IfEqual, IfExtends, IfOr } from "types/boolean-logic";
import { AnyFunction } from "../functions/function-types";
import { And } from "./And";
import { AnyObject, IsEmptyObject } from "./object";

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
  TParamMatch extends Record<string, any> | undefined = undefined
> = TFn extends AnyFunction
    ? IsEmptyObject<TFn> extends true 
        ? false 
        : // there are some props on TFn
          IfOr<
            [
                And<[
                    // the Fn extends the param matcher
                    IfExtends<TFn, TParamMatch>,
                    // TParamMatch is set
                    IfExtends<TParamMatch, AnyObject>, 
                ]>,
                IfEqual<TParamMatch, undefined>
            ],
            true,
            false
        >
    : false;
