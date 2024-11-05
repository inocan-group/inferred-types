import { AnyFunction, AsFnMeta } from "inferred-types/dist/types/index";

/**
 * **OnlyFnProps**`<T>`
 *
 * Takes a function `T` and strips the function away leaving only
 * any key/values that were stored alongside it.
 */
export type OnlyFnProps<
  T extends AnyFunction
> = AsFnMeta<T>["props"];
