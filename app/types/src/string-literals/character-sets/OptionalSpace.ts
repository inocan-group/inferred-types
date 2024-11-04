/**
 * **OptionalSpace**
 *
 * Allows for an optional space to be included
 */
export type OptionalSpace = "" | " ";

/**
 * @alias `OptionalSpace`
 */
export type OptSpace = OptionalSpace;

/**
 * _zero, one, or two_ **space** characters
 */
export type OptSpace2 = OptionalSpace | "  ";


/**
 * **0** _to_ **4** _space_ characters
 */
export type OptSpace4 = OptionalSpace |  "   " |  "    ";
