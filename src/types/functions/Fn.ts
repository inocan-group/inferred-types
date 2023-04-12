/* eslint-disable @typescript-eslint/ban-types */
import { AnyFunction } from "src/types/base-types";
import type { IfEqual } from "src/types";
import { FnMeta } from "./FnMeta";
import { FnProps } from "./FnProps";


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
