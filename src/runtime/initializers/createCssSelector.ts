import { If, IsUndefined } from "src/types/boolean-logic";
import {
  CssClassSelector,
  CssIdSelector,
  CssPseudoClass,
  CssSelector,
  CssTagSelector,
  Join
} from "src/types/string-literals";
import { TupleToUnion } from "src/types/type-conversion";

export type CssSelectorOptions = {
  ids?: readonly CssIdSelector[],
  classes?: readonly CssClassSelector[],
  tags?: readonly CssTagSelector[],
  pseudo?: readonly CssPseudoClass[]
};

export type AsClassSelector<
  T extends CssSelectorOptions | undefined
> = If<
  IsUndefined<T>,
  CssSelector<CssIdSelector, CssClassSelector, CssTagSelector, CssPseudoClass>,
  T extends CssSelectorOptions
  ? CssSelector<
      If<
        IsUndefined<T["ids"]>,
        CssIdSelector,
        TupleToUnion<T["ids"]>
      >,
      If<
        IsUndefined<T["classes"]>,
        CssClassSelector,
        TupleToUnion<T["classes"]>
      >,
      If<
        IsUndefined<T["tags"]>,
        CssTagSelector,
        TupleToUnion<T["tags"]>
      >,
      If<
        IsUndefined<T["pseudo"]>,
        CssPseudoClass,
        TupleToUnion<T["pseudo"]>
      >
    >
  : never
>;
;
// [] extends T
// ? CssClassSelector
// : TupleToUnion<T> extends CssClassSelector
//   ? TupleToUnion<T>
//   : never;



/**
 * **createCssSelector**`(opt) => (...select) => string`
 *
 * A higher order utility which:
 *
 * - on first call allows you to _narrow_ the types of selectors which are
 * available
 * - afterward it allows 1..M selectors to be chained (including pseudo
 * classes)
 *
 * Ensures correct syntax and aids in auto-completion of CSS props.
 */
export const createCssSelector = <
  TOpt extends CssSelectorOptions,
>(
  _opt?: TOpt
) => <
  TSelect extends readonly CssSelector<
    TOpt["ids"] extends readonly CssIdSelector[] ? TupleToUnion<TOpt["ids"]> : CssIdSelector,
    TOpt["classes"] extends readonly CssClassSelector[] ? TupleToUnion<TOpt["classes"]> : CssClassSelector,
    TOpt["tags"] extends readonly CssTagSelector[] ? TupleToUnion<TOpt["tags"]> : CssTagSelector,
    TOpt["pseudo"] extends readonly CssPseudoClass[] ? TupleToUnion<TOpt["pseudo"]> : CssPseudoClass
  >[]
>(...selectors: TSelect): Join<TSelect, " "> => {
  return selectors.join(" ") as string as Join<TSelect, " ">
}
