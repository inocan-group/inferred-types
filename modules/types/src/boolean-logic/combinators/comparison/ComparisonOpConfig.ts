/**
 * Operations to perform across all parameters in a comparision
 * to create a `Comparator`. These operations will reduce all
 * parameters to a single parameter.
 */
export type ComparisonParamConvert__List
    = | "union"
| "stringUnion"
| "stringArray";

/**
 * Operations to perform on one (or all) parameters in a
 * comparision to create a `Comparator`. These operations
 * will not change the _arity_ of the Comparator vs. the params.
 */
export type ComparisonParamConvert__Unit
    = | "token"
| "stringLiteral"
| "none";

/**
 * Ways to convert conversion parameters to a `Comparator`
 * type when the `convert` configuration is active.
 */
export type ComparisonParamConvert
    = | ComparisonParamConvert__List
    | ComparisonParamConvert__Unit;

/**
 * The definition of a _comparator's_ configuration
 */
export type ComparisonOpConfig = {
    params: readonly unknown[];
    /**
     * Explicitly state the _type_ the runtime function can take when moved
     * into strict mode. If not stated, it will be inferred based on the
     * parameters.
     */
    accept?: unknown;

    /**
     * how many parameters the function expects to take
     */
    take?: 0 | 1 | 2 | 3 | "*";
    /**
     * conversion of the parameters before comparison starts
     *
     * - if a tuple then the conversion is done element by element
     * of the parameters received
     * - if not a tuple then the operation is performed across
     * all the parameters
     *
     * **Note:** some operations -- like `union` -- when applied across
     * parameters will change the parameter count; this is likely
     * desired but just make sure you consider this.
     */
    convert?: ComparisonParamConvert | readonly ComparisonParamConvert__Unit[];
};
