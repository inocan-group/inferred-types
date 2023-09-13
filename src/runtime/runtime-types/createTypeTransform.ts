import { IfNull, Narrowable, ParamsForComparison, RefTypeForComparison, TransformElement, TypeComparisonHandler, TypeComparisonOp, TypeTransformOp } from "../../types/base";
import { KindApi, omit } from "src/runtime";



const outputFormat = <
  TOp extends TypeTransformOp,
  TParams extends readonly unknown[],
  TCond extends TypeComparisonOp | null,
  TCondParams extends readonly unknown[],
  THandling extends TypeComparisonHandler
>(op: TOp, transformParams: TParams, cond: TCond, condParams: TCondParams, strategy: THandling) => {
  const api = {
    /**
     * allows you to choose a "handling" strategy for when a
     * conditional expression is _not_ matched.
     */
    handlingStrategy: <TStrategy extends TypeComparisonHandler>(strategy: TStrategy) => {
      return outputFormat(op,transformParams, cond, condParams, strategy);
    },
    /**
     * Provides the configuration for the transform in the form of
     * a `TransformElement` so that it can be reused or packed into
     * a transform pipeline.
     */
    asConfig: () => {
      return (
        cond === null
      ? [
        op,
        transformParams,
        [cond, condParams, strategy]
      ]
      : [
        op,
        transformParams,
      ]
      ) as IfNull<TCond, [TOp,TParams], [TOp,TParams,[TCond,TCondParams,THandling]]> & TransformElement;
    },
    /**
     * Provides a function which takes an input and then uses
     * the configured transform on this input value.
     */
    asFn: () => {
      return ((
        cond === null
          ? () => ""
          : () => ""
      ));
    }
  };

  return (
    cond === null
      ? omit(api, "handlingStrategy")
      : api
  ) as IfNull<TCond, Omit<typeof api, "handlingStrategy">, typeof api>;
};

export const createTypeTransform = <
  TOp extends TypeTransformOp,
  TParams extends readonly Narrowable[]
>(op: TOp, ...params: TParams) => {
  return {
    onCondition<
      TCond extends TypeComparisonOp, 
      TCondParams extends readonly ((cb: KindApi) => Narrowable)[]
    >(cond: TCond, ...condParams: TCondParams ) {
      return outputFormat(op, params, cond, condParams, "throw");
    },
    withoutCondition() {
      return outputFormat(op, params, null, [], "throw");
    }
  };
}; 
