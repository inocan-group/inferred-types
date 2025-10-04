import { Dictionary, OnlyIndexKeys } from "inferred-types/types";


/**
 * **GetIndexKeys`<T>`
 *
 * Returns a union type of all the _index_ types found in `T`.
 *
 * - an index can be wide-type indexes such as `{ [x: string]: string }`
 * _or_ `{ [x: symbol]: number }`
 * - but they can also be _template literal_ indexes like `{ [x: `_${string}`]: string }`
 *
 * **Related:** `OnlyIndexKeys`
 */
export type GetIndexKeys<T extends Dictionary> = keyof OnlyIndexKeys<T> & (string | symbol);
