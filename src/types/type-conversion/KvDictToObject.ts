
import { AfterFirst, First, AnyObject, Type, SimplifyObject, KvDict, Mutable } from "src/types";

export type TypeKvBase<
  K extends string = string, 
  T extends Type = Type
> = KvDict<K,T>;

/**
 * **ObjectFromKv**`<KvDict>`
 * 
 * A type utility designed to convert an `ObjectType`'s internal representation
 * into the actual Typescript _type_ which this run/design time structure represents.
 */
export type TypeKvToObject<
  KvDict extends readonly TypeKvBase<string,Type>[],
  Obj extends AnyObject = object
> = [] extends KvDict
  ? SimplifyObject<Obj>
  : First<KvDict> extends TypeKvBase<infer K, infer T>
    ? TypeKvToObject<AfterFirst<KvDict>, Record<K, T["type"]> & Obj>
    : never;

/**
 * **KvToObject**`<KV>`
 * 
 * Type utility to convert an array of KV's to a strongly typed object.
 * ```ts
 * // { foo: 1; bar: 2 }
 * type T = KvToObject<[
 *    {key: "foo"; value: 1}, 
 *    {key: "bar"; value: 2}
 *  ]>;
 * ```
 */
export type KvDictToObject<
  KV extends readonly KvDict[],
  TObj extends AnyObject = object
> = [] extends KV
  ? SimplifyObject<TObj>
  : First<KV> extends KvDict<infer Key, infer Value>
    ? Key extends keyof TObj
      ? ["ERROR", `Key of ${Key} already exists`]
      : Mutable<Value> extends KvDict[]
        ? KvDictToObject< // prop is an object
            [...AfterFirst<KV>], 
            TObj & Mutable<Record<Key, Readonly<KvDictToObject<Mutable<Value>>>>>
          >
        : KvDictToObject<
            [...AfterFirst<KV>], 
            TObj & Mutable<Record<Key, Value>>
          >
    : First<KV>;
