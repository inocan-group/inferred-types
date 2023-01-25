
/**
 * Recursively goes over an object based structure and tries to reduce
 * it down to just a simple key/value type.
 */
export type ExpandRecursively<T> = T extends object
  ? T extends (...args: any[]) => any
    // Functions should be treated like any other non-object value
    // but will/can identify as an object in JS
    ? T
    : { [K in keyof T]: ExpandRecursively<T[K]> }
  : T;