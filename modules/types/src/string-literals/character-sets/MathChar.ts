import {  EqualityChar, PercentChar } from "types/string-literals";


/**
 * **MathChar**
 *
 * Characters representing match operations like addition, subtraction, multiplication, division, equality, percentage, etc.
 */
export type MatchChar = PercentChar | EqualityChar | `+` | `-` | `*` | `^` | `✕` | `×` | `÷` | `/`;
