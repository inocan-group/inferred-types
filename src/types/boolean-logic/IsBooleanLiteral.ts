import { Narrowable } from "../literals/Narrowable";
import { IsFalse } from "./IsFalse";
import { IsTrue } from "./IsTrue";
import { IfOr } from "./Or";

/**
 * **IsBooleanLiteral**`<T>`
 *
 * Boolean type utility which detects whether `T`
 * is a boolean literal (aka, is `true` or `false`)
 */
export type IsBooleanLiteral<T extends Narrowable> = IfOr<
  [IsTrue<T>, IsFalse<T>],
  true,
  false
>;

