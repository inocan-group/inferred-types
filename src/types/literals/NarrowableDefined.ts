/* eslint-disable @typescript-eslint/ban-types */


/**
 * **NarrowableDefined**
 * 
 * Precisely the same as the `Narrowable` type but without _undefined_ as an option
 * 
 * **Related:** `Narrowable`, `NarrowableScalar`
 */
export type NarrowableDefined = string | number | boolean | symbol | object | void | null | {};
