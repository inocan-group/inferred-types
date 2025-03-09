/**
 * **RegexHandlingStrategy**
 *
 * Indicating whether the string value representing a `RegExp` should be matched
 * literally/exactly or whether it should be measured as a _substring_ of some larger
 * whole.
 */
export type RegexHandlingStrategy = "exact" | "subset";
