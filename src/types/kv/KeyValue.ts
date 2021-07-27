import { ExpandRecursively } from "../ExpandRecursively";

/**
 * Provides a strongly typed _key_ and _value_ for a dictionary `T`
 * 
 * ```ts
 * type Obj = { foo: 1, bar: "hi" };
 * // ["foo", 1 ]
 * type Foo = KeyValue<Obj, "foo">;
 * ```
 */
export type KeyValue<T extends object, K extends keyof T> = [K & keyof T, ExpandRecursively<T[K]>];
