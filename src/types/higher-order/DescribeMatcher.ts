import { Concat, DescForComparison, Interpolate,  TypeComparisonHandler, TypeComparisonOp } from "../base";

type Desc<
  TOp extends TypeComparisonOp,
  TProps extends readonly unknown[]
> = Interpolate<
  DescForComparison<TOp>,
  TProps
>;

type HandlerDesc<
  T extends TypeComparisonHandler
> = T extends "throw"
? `When errors are encountered the runtime is expected to throw the error.`
: T extends "skip"
  ? `When comparison results in 'false' or an ErrorCondition; caller will be expected to skip the associated task.`
  : T extends "exclude"
    ? `When comparison results in 'false' or an ErrorCondition; caller will be expected to exclude this input's value in the associated task.`
    : never;

export type DescribeMatcher<
  TOp extends TypeComparisonOp,
  TProps extends readonly unknown[],
  THandler extends TypeComparisonHandler
> = DescForComparison<TOp> extends string
  ? Concat<["A provided input ", Desc<TOp,TProps>, ". ", HandlerDesc<THandler>]>
: "no description";
