import { AnyObject, HasKeys, IfEqual,  ReadonlyProps } from "src/types";

/**
 * **IsReadonlyObject**`<T>`
 * 
 * Boolean operator which tests whether `T` is a _readonly
 * object_. This is defined as an object where all properties
 * are readonly. 
 * 
 * - Note: objects with no properties return `false`
 */
export type IsReadonlyObject<T> = 
T extends AnyObject
  ? HasKeys<T> extends true
    ? IfEqual<ReadonlyProps<T>, T, true, false>
    : false
  : false;


