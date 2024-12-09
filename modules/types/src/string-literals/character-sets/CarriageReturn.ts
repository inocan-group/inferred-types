import type { Indent } from "./Indent";

/** The **carriage return** character */
export type Cr = "\n";

/** An _optional_ **carriage return** character */
export type OptCr = "\n" | "";

/**
 * a **carriage return** character followed by indentation
 *
 * **Related:** `OptCrThenIndent`, `Cr`, `OptCr`
 */
export type CrThenIndent = `${Cr}${Indent}`;

/**
 * an _optional_ **carriage return** character followed by indentation
 *
 * **Related:** `CrThenIndent`, `Cr`, `OptCr`
 */
export type OptCrThenIndent = CrThenIndent | "";
