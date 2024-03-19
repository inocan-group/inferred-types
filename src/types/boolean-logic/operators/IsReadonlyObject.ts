import {  MutableProps,  EmptyContainer,  KV } from "src/types/index";

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
  ? EmptyContainer<MutableProps<T>> extends true
    ? EmptyContainer<T> extends true ? false :true
    : false
  : false;


