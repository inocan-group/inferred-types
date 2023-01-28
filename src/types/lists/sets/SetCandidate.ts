import { Narrowable } from "types/literals/Narrowable";

/**
 * **SetCandidate**
 * 
 * A _set candidate_ is the base type for a type which can be converted
 * into a "set" (and have set operations applied).
 */
export type SetCandidate = readonly Narrowable[] | Narrowable;