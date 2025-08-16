/**
 * **FalsyValue**
 *
 * A union of all _falsy_ values.
 *
 * **Note:**
 * - any value which is _not_ falsy is "truthy"
 * - in addition to the types in this union type; `NaN` too is
 * considered _falsy_ but there is no type representation for this.
 */
export type FalsyValue = false | 0 | -0 | "" | "false" | null | undefined;
