import type {
    FnKeyValue,
    FnReturn,
    IsNarrowingFn,
    IsNonEmptyObject,
    TypedFunction,
} from "inferred-types/types";

/**
 * **FnMeta**<TArgs,TReturn,TProps>
 *
 * The meta-information around a given function.
 *
 * ```ts
 * // {
 * //   fn: () => "hi";
 * //   params: [];
 * //   returns: "hi";
 * //   hasParams: false;
 * //   hasProps: false;
 * //   kind: "identity";
 * // }
 * type Test = FnMeta<() => "hi">;
 * ```
 */
export type FnMeta<
    TFn extends TypedFunction,
> = {
    /** the function itself */
    fn: TFn;
    /** the parameters of the function */
    params: Parameters<TFn>;
    /** the return type of the function */
    returns: FnReturn<TFn>;
    props: FnKeyValue<TFn>;
    hasProps: [IsNonEmptyObject<FnKeyValue<TFn>>] extends [true] ? true : false;
    hasParams: Parameters<TFn>["length"] extends 0 ? false : true;
    kind: IsNarrowingFn<TFn> extends true
        ? "narrowing"
        : Parameters<TFn>["length"] extends 0 ? "identity" : "static";
};
