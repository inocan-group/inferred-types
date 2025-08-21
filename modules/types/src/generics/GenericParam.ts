import { InputTokenSuggestions } from "types/runtime-types";

/**
 * **GenericParam**
 *
 * A structured representation of a generic parameter used by runtime types
 * like `InputToken`.
 *
 * **Related:** `GenericParamToken`
 */
export type GenericParam = {
    /** the generic's name */
    name: string;
    /**
     * a _string based_ `InputToken` representing the generic's
     * type.
     */
    token: InputTokenSuggestions;
    /**
     * the **type** the given generic parameter  _extends_
     */
    type: unknown;
}

