/**
 * **IsBoolean**
 * 
 * Boolean type utility which detects literal or wide boolean type.
 */
export type IsBoolean<T> = [T] extends [boolean] ? true : false;
