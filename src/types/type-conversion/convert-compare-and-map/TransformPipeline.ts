import { Tuple, TypeTransformOp, TypeTransformRequiresParam, ErrorCondition, Concat, ValidTransformParams } from "src/types";

/**
 * **TransformPipeline**
 * 
 * A tuple of transform operations -- or a tuple with [op,params] -- which will be executed
 * in order when passed to `TypeTransform` utility.
 * 
 * **Note:** use the `VerifyTransformPipeline` utility to further check the validity
 * of the pipeline's structure. 
 */
export type TransformPipeline = (TypeTransformOp | [op: TypeTransformOp, params: Tuple])[];

/**
 * **VerifyTransformPipeline**`<T>`
 * 
 * Provides an _identity function_ for valid pipelines while converting the
 * type to an appropriate `ErrorCondition` if the pipeline is invalid.
 */
export type VerifyTransformPipeline<
  T extends TransformPipeline
> = {
  [K in keyof T]: T[K] extends TypeTransformOp
    ? TypeTransformRequiresParam<T[K]> extends true
      ? ErrorCondition<
          "missing-params",
          Concat<[
            `The operation '`,
            T[K],
            `' in the Pipeline requires properties to be provided!`
          ]>,
          "TransformPipeline",
          { pipeline: T; operation: T[K] }
        >
      : T[K]
    : T[K] extends [op: TypeTransformOp, params: Tuple ]
      ? ValidTransformParams<T[K][0],T[K][1]> extends true
        ? T[K]
        : ErrorCondition<
            "invalid-params",
            Concat<[
              `The '`,
              T[K][0],
              `'operation received invalid parameters!`
            ]>,
            "TransformPipeline",
            { pipeline: T; operation: T[K][0]; params: T[K][1] }
          >
      : never
};
