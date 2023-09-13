import { 
  TypeComparisonHandler,
  TypeComparisonOp,
} from "../base";

/**
 * **Matcher**`<TOp,TRefType,[THandler]>`
 * 
 * A tuple definition of a future comparison. It contains
 * the comparison operation, a reference type, and
 * optionally can contain a "handler" type.
 */
export type Matcher<
  TOp extends TypeComparisonOp = TypeComparisonOp,
  TProps extends readonly unknown[] = readonly unknown[],
  THandler extends TypeComparisonHandler = TypeComparisonHandler,
  TDesc extends string | never = string | never
> = [
  op: TOp,
  props: TProps,
  handle: THandler,
  desc: TDesc
];
