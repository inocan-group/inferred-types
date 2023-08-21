import { 
  DescribeMatcher,
  IfEqual,
  Matcher,
  TypeComparisonHandler,
  TypeComparisonOp,
} from "src/types";

type Handler<T extends TypeComparisonHandler | never> = IfEqual<T, TypeComparisonHandler | never, "throw", T>;
type Desc<
  TOp extends TypeComparisonOp,
  TProps extends readonly unknown[],
  THandler extends TypeComparisonHandler
> = DescribeMatcher<TOp,TProps,THandler>;

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
  Desc<
    TOp,
    TProps,
    Handler<THandler>
  >
] & Matcher;

// [
//   op: IfEqual<TOp, TypeComparisonOp, never, TOp>,
//   props: TProps,
//   handle: IfEqual<THandler, TypeComparisonHandler | never, "throw", THandler>,
//   desc: DescribeMatcher<
//           TOp,TProps,IfEqual<THandler, TypeComparisonHandler | never, "throw", WithDefault<THandler, "throw">>
//         >
// ] extends Matcher<infer Op, infer Props, infer Handler, infer Desc>
//   ? Matcher<Op,Props,Handler,Desc>
//   : never;
