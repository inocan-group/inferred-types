/**
 * a set of options for logical utilities like `And` and `Or` which receive an
 * array of logic based values.
 */
export type LogicOptions = {
    /**
     * The type to return if the passed in conditions
     * were an empty array.
     */
    empty?: boolean;
    /**
     * Determines how to handle when the conditions passed in
     * don't hit the required type requirements
     * (aka, `readonly (boolean & LogicFunction)[]`):
     *
     * - `"error"` - returns a descriptive error message; good for debugging purposes
     * - `"false"` - all error conditions are converted to `false` to preserve the return
     * type as being exclusively a boolean value
     */
    err?: "error" | "false";
};
