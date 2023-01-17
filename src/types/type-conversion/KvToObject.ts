import { AfterFirst } from "../lists";
import { First } from "../lists/First";
import { Type } from "../runtime-types/Type";
import { SimplifyObject } from "../SimplifyObject";
import { Mutable } from "./Mutable";

/**
 * **KvPair**`<K,V>`
 * 
 * A key-value pairing of the type `{ key: K; value: V }` 
 */
export type KvPair<
  K extends string,
  V
> = {key: K; value: V};

export type TypeKvBase<
  K extends string, 
  T extends Type
> = KvPair<K,T>;

/**
 * **ObjectFromKv**`<KV>`
 * 
 * A type utility designed to convert an `ObjectType`'s internal representation
 * into the actual Typescript _type_ which this run/design time structure represents.
 */
export type TypeKvToObject<
  KV extends readonly TypeKvBase<string,Type>[],
  Obj extends {} = {}
> = [] extends KV
  ? SimplifyObject<Obj>
  : First<KV> extends TypeKvBase<infer K, infer T>
    ? TypeKvToObject<AfterFirst<KV>, Record<K, T["type"]> & Obj>
    : never;

/**
 * **KvToObject**`<KV>`
 * 
 * Type utility to convert an array of KV's to a strongly typed object.
 */
export type KvToObject<
  KV extends readonly KvPair<string,any>[],
  TObj extends {} = {}
> = [] extends KV
  ? SimplifyObject<TObj>
  : First<KV> extends KvPair<infer Key, infer Value>
    ? Key extends keyof TObj
      ? ["ERROR", `Key of ${Key} already exists`]
      : Mutable<Value> extends KvPair<string, any>[]
        ? KvToObject< // prop is an object
            [...AfterFirst<KV>], 
            TObj & Mutable<Record<Key, Readonly<KvToObject<Mutable<Value>>>>>
          >
        : KvToObject<
            [...AfterFirst<KV>], 
            TObj & Mutable<Record<Key, Value>>
          >
    : First<KV>;
