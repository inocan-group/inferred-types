
/**
 * **EqualityChar**
 *
 * A comprehensive set of symbols involving the expression of some sort of equality
 * measurement.
 *
 * **Related:** `EqualNotEqualChar`, `EqualGreaterLessorChar`
 */
export type EqualityChar = "=" | "≃" | "≈" | "≄" | "≥" | "≧" | "≤" | "≦" | "≠" | "≰" | "≱" | ">" | "<";



/**
 * **EqualNotEqualChar**
 *
 * A union of the equals(`=`) character and the _not equals_(`≠`) character.
 *
 * **Related:** `EqualGreaterLessorChar`, `EqualityChar`, `MatchChar`
 */
export type EqualNotEqualChar = "=" | "≠";


/**
 * **EqualGreaterLessorChar**
 *
 * The core mathematical comparison operators.
 *
 * **Related:** `EqualNotEqualChar`, `EqualityChar`, `MatchChar`
 */
export type EqualGreaterLessorChar = "=" | "≠" | "≥" | ">" | "<" | "≦" | "≠"
