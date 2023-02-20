/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction, AnyObject, RegularFn } from "../base-types";
import { IfEqual, IfLength } from "../boolean-logic/branching";
import {  Keys } from "../dictionary";
import { FnMeta } from "./FnMeta";
import { FnProps } from "./FnProps";

// export interface FnStructure<
//   A extends readonly unknown[],
//   R,
//   D extends AnyObject | "no-props"
// > {
//   args: A;
//   returns: R;
//   props: D;
// }

/**
 * **Fn**`<TFn>`
 * 
 * Receives a function `TFn` and returns the meta information as `FnMeta`.
 */
export type Fn<
  TFn extends AnyFunction
> = IfEqual<
  FnProps<TFn>, {},
  FnMeta<Parameters<TFn>, ReturnType<TFn>, "no-props">,
  FnMeta<Parameters<TFn>, ReturnType<TFn>, FnProps<TFn>>
>;
