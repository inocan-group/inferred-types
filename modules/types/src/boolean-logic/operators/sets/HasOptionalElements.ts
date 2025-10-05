import { NotEqual, Container } from "inferred-types/types";


/**
 * **HasOptionalElements**`<T>`
 *
 * Boolean operator which detects whether the container `T` has any
 * elements/keys which are considered "optional".
 */
export type HasOptionalElements<T extends Container> = NotEqual<Required<T>, T>;
