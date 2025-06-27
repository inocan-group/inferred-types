/**
 * _indentation of 2 spaces_
 *
 * **Related**: `Indent`, `IndentSpaces`, `Indent4`, `IndentTab`
 */
export type Indent2 = "  ";

/**
 * _indentation of 4 spaces_
 *
 * **Related**: `Indent`, `IndentSpaces`, `Indent2`, `IndentTab`
 */
export type Indent4 = "    ";

/**
 * _indentation using the tab character_
 *
 * **Related**: `Indent`, `IndentSpaces`, `Indent2`, `Indent4`
 */
export type IndentTab = "\t";

/**
 * _indentation using 2 or 4 spaces, or the tab character_
 *
 * **Related**: `IndentSpaces`, `Indent2`, `Indent4`, `IndentTab`
 */
export type Indent = Indent2 | Indent4 | IndentTab;

/**
 * _indentation using 2 or 4 spaces_
 *
 * **Related**: `Indent`, `Indent4`, `IndentTab`
 */
export type IndentSpaces = Indent2 | Indent4;
