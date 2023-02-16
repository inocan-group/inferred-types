/* eslint-disable @typescript-eslint/ban-types */

/**
 * **Narrowable**
 * 
 * A union of types which when used as a generic's base value helps to extract
 * the most narrow definition available.
 * 
 * **Related:** `NarrowableDefined`, `NarrowableScalar`
 */
export type Narrowable = string | number | boolean | symbol | object | undefined | void | null;
