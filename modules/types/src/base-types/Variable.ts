import type {
    AfterFirst,
    AlphaChar,
    AlphanumericChar,
    Chars,
    First,
    VariableChar,
} from "inferred-types/types";

/**
 * **Variable**
 *
 * the **Variable** type reinforces that a variable:
 *
 * - start with an alpha character (upper or lower)
 * - end with an alphanumeric character
 *
 * Further type safety would become too expensive.
 */
export type Variable = `${AlphaChar}${string}${AlphanumericChar}`;

type ValidChars<T extends readonly string[]> = [] extends T
    ? true
    : First<T> extends VariableChar
        ? ValidChars<AfterFirst<T>>
        : false;

/**
 * Boolean operator which returns `true` when `T` is a valid variable
 * name.
 */
export type IsVariable<T extends string> = T extends Variable
    ? ValidChars<Chars<T>> extends true
        ? true
        : false
    : false;
