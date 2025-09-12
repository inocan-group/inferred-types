import type { Narrowable } from "inferred-types/types";

/**
 * **Narrow**
 *
 * Just like the `Narrowable` type, this type is used in the _extends_
 * clause during runtime to extract the narrowest types possible. Unlike
 * the `Narrowable` type, **Narrow** _excludes_ **symbols**.
 */
export type Narrow = Exclude<Narrowable, symbol>;
