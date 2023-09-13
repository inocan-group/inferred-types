import { 
  DescForComparison,
  IfEqual,
  Matcher,
  TypeComparisonHandler,
  TypeComparisonOp,
} from "../base";

type Handler<T extends TypeComparisonHandler | never> = IfEqual<T, TypeComparisonHandler | never, "throw", T>;


/**
 * **AsMatcher**`<TOp,TProps,[THandler]>`
 * 
 * Ensures that a fully qualified `Matcher` type is produced including
 * a prose description.
 */
export type AsMatcher<
  TOp extends TypeComparisonOp,
  TProps extends readonly unknown[] = [],
  THandler extends TypeComparisonHandler | never = TypeComparisonHandler | never
> = [
  TOp,
  TProps,
  Handler<THandler>,
  DescForComparison<TOp> extends string
    ? DescForComparison<TOp>
    : "no description"
] & Matcher;
