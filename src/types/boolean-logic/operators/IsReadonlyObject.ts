import {   KV, ReadonlyKeys, IsEqual } from "src/types/index";

/**
 * **IsReadonlyObject**`<T>`
 * 
 * Boolean operator which tests whether `T` is a _readonly
 * object_. This is defined as an object where all properties
 * are readonly. 
 * 
 * - Note: objects with no properties return `false`
 */
export type IsReadonlyObject<T> = T extends KV
  ? IsEqual<ReadonlyKeys<T>, keyof T>
  : false;

