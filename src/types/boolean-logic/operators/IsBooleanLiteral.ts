import type { IfBoolean, IfEqual } from "src/types";

/**
 * **IsBooleanLiteral**`<T>`
 *
 * Boolean type utility which detects whether `T`
 * is a boolean literal (aka, is `true` or `false`)
 */
export type IsBooleanLiteral<T> = IfBoolean<T, IfEqual<T, boolean, false, true>, false>;

