;
import { AfterFirst } from "../lists";
import { First } from "../lists/First";
import { Type } from "../runtime-types/Type";
import { SimplifyObject } from "../SimplifyObject";

export type TypeKvBase<
  K extends string, 
  T extends Type
> = {key: K; value: T};

/**
 * **ObjectFromKv**
 * 
 * A type utility designed to convert an `ObjectType`'s internal representation
 * into the actual Typescript _type_ which this run/design time structure represents.
 */
export type ObjectFromKv<
  KV extends readonly TypeKvBase<string,Type>[],
  Obj extends {} = {}
> = [] extends KV
  ? SimplifyObject<Obj>
  : First<KV> extends TypeKvBase<infer K, infer T>
    ? ObjectFromKv<AfterFirst<KV>, Record<K, T["type"]> & Obj>
    : never;
