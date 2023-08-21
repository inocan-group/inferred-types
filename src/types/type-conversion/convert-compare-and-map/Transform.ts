import { 
  ConditionalTransform, 
  TransformElement,
   Tuple, 
   TypeTransformOp, 
   Matcher,
   UnconditionalTransform,
   AsArray,
   WithDefault,
} from "src/types";

/** extract the transform Operation from an element */
type TrfOp<
  T extends TransformElement
> = T extends readonly [TypeTransformOp, ...unknown[] ]
? T[0]
: never;

/** extract the Params from an element */
type Params<
  T extends TransformElement
> = T extends readonly [TypeTransformOp, Tuple, ...unknown[]]
? T[1]
: never;

type GetMatcher<
  T extends TransformElement
> = T[2] extends Matcher
? [ T[2][0], T[2][1], WithDefault<T[2][2], "throw"> ] & Matcher
: [ "Extends", unknown, "throw"] & Matcher;


/** differentiate between conditional and unconditional transforms */
type IsConditional<
  TElement extends TransformElement
> = TElement extends [Matcher, TypeTransformOp, Tuple]
? true
: false;

type Process<
  TInput,
  TTransforms extends readonly TransformElement[]
> = {
  [ K in keyof TTransforms ]: IsConditional<TTransforms[K]> extends true
    ? ConditionalTransform<
        TInput,
        GetMatcher<TTransforms[K]>,
        TrfOp<TTransforms[K]>,
        Params<TTransforms[K]>
      >
    : UnconditionalTransform<
        TrfOp<TTransforms[K]>,
        TInput,
        Params<TTransforms[K]>
      >;
};


/**
 * **Transform**`<TInput,TTransforms>`
 * 
 * Takes a given input `TInput` and transforms it by each of the
 * transforms provided. 
 * 
 * - `TTransforms` can be a single `TransformElement` or a tuple of
 * elements
 * - The transforms may be either _conditional_
 * or _unconditional_ transforms and are described by the 
 * `TransformElement` type (where a conditional transform includes
 * a `Matcher`)
 */
export type Transform <
  TInput,
  TTransforms extends TransformElement | readonly TransformElement[]
> = Process<
  TInput, 
  AsArray<TTransforms> & readonly TransformElement[]
>;
