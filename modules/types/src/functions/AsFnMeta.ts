import type {
  AnyFunction,
  EmptyObject,
  ExpandDictionary,
  FnMeta,
  FnProps,
  IsNonEmptyObject,
  TypedFunction,
} from "inferred-types/types";

/**
 * **AsFnMeta**`<TFn>`
 *
 * Converts any function into `FnMeta` format.
 */
export type AsFnMeta<
  TFn extends AnyFunction,
> = TFn extends TypedFunction
  ? [IsNonEmptyObject<FnProps<TFn>>] extends [true]
      ? FnMeta<
        TFn,
        Parameters<TFn>,
        ReturnType<TFn>,
        ExpandDictionary<FnProps<TFn>>
      >
      : FnMeta<TFn, Parameters<TFn>, ReturnType<TFn>, EmptyObject>

  : FnMeta<TypedFunction, any[], any, EmptyObject>;

type _x = FnMeta<TypedFunction, any[], any, EmptyObject>;
