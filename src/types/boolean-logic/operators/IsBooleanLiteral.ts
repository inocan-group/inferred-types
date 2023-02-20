import { IfOr, IsFalse, IsTrue } from "src/types/boolean-logic";

/**
 * **IsBooleanLiteral**`<T>`
 *
 * Boolean type utility which detects whether `T`
 * is a boolean literal (aka, is `true` or `false`)
 */
export type IsBooleanLiteral<T> = IfOr<
  [IsTrue<T>, IsFalse<T>],
  true,
  false
>;

