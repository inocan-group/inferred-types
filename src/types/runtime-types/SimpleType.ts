import type {
  SIMPLE_DICT_VALUES,
  SIMPLE_MAP_KEYS,
  SIMPLE_MAP_VALUES,
  SIMPLE_SET_TYPES
} from "src/constants/index";
import {
  ExpandDictionary,
  SimpleScalarToken, SimpleToken, SimpleUnionToken,
  Dictionary,
  AsNumber,
  CsvToStrUnion, CsvToTuple, CsvToUnion,
  UnderlyingType,
  TupleToUnion,
  SimpleDictToken,
  SimpleMapToken,
  SimpleSetToken,
  SimpleArrayToken
} from "src/types/index";

type SetTypes = typeof SIMPLE_SET_TYPES[number];
type MapKeys = typeof SIMPLE_MAP_KEYS[number];
type MapValues = typeof SIMPLE_MAP_VALUES[number];
type DictValues = typeof SIMPLE_DICT_VALUES[number];


/**
 * **SimpleTypeScalar**`<T>`
 *
 * Converts a `SimpleScalarToken` into the _type_ it represents.
 */
export type SimpleTypeScalar<T extends SimpleScalarToken> =
T extends "string"
? string
: T extends `string(${infer Literal})`
? Literal extends `${string},${string}`
  ? CsvToStrUnion<Literal>
  : Literal
: T extends "number"
? number
: T extends `number(${infer Literal})`
? Literal extends `${string},${string}`
  ? CsvToUnion<Literal>
  : AsNumber<Literal>
: T extends "boolean"
? boolean
: T extends "true"
? true
: T extends "false"
? false
: T extends "null"
? null
: T extends "any"
? any
: T extends "undefined"
? undefined
: T extends "unknown"
? unknown
: T extends `Opt<${infer Underlying extends SimpleScalarToken}>`
? undefined | SimpleTypeScalar<Underlying>
: never;


/**
 * **SimpleTypeUnion**`<T>`
 *
 * Converts a `SimpleUnionToken` into the _type_ it represents.
 */
export type SimpleTypeUnion<T extends SimpleUnionToken> =
T extends "opt(string)"
  ? string | undefined
: T extends "opt(number)"
  ? number | undefined
: T extends "opt(boolean)"
  ? boolean | undefined
: T extends "opt(unknown)"
  ? unknown | undefined
: T extends `opt(${infer Literal extends string})`
  ? Literal extends `${string},${string}`
    ? TupleToUnion<CsvToTuple<Literal>> | undefined
    : UnderlyingType<Literal> | undefined
: T extends `Union(${infer Literal})`
  ? Literal extends `${string},${string}`
    ? CsvToTuple<Literal>
    : Literal
: never;


export type SimpleTypeDict<T extends SimpleDictToken> =
T extends `Dict`
? Dictionary
: T extends `Dict<string, ${infer Value extends DictValues & SimpleScalarToken}>`
? Dictionary<string, SimpleTypeScalar<Value>>
: T extends `Dict<{${infer K}: ${infer V}, ${infer K2}: ${infer V2}}>`
  ? V extends SimpleScalarToken
    ? V2 extends SimpleScalarToken
      ? ExpandDictionary<
          Record<K, SimpleTypeScalar<V>> & Record<K2, SimpleTypeScalar<V2>> & Dictionary
        >
      : ExpandDictionary<Record<K, SimpleTypeScalar<V>> & Dictionary>
  : V2 extends SimpleScalarToken
    ? ExpandDictionary<Record<K2, SimpleTypeScalar<V2>> & Dictionary>
    : never
: T extends `Dict<{${infer Key}: ${infer Value}}>`
  ? Value extends SimpleScalarToken
    ? ExpandDictionary<Record<Key, SimpleTypeScalar<Value>> & Dictionary>
    : never
: never;

export type SimpleTypeArray<T extends SimpleArrayToken> = T extends "Array"
? any[]
: T extends "Array<string>"
? string[]
: T extends `Array<string(${infer StringUnion})>`
? Array<SimpleTypeScalar<`string(${StringUnion})`>>
: T extends "Array<number>"
? number[]
: T extends `Array<number(${infer NumericUnion extends `${number}`})>`
? Array<SimpleTypeScalar<`number(${NumericUnion})`>>
: T extends "Array<boolean>"
? boolean[]
: T extends "Array<unknown>"
? unknown[]
: never;

export type SimpleTypeMap<T extends SimpleMapToken> = T extends "Map"
? Map<any,any>
: T extends `Map<${infer Key extends MapKeys}, ${infer Value extends MapValues}>`
// eslint-disable-next-line no-use-before-define
? Map<SimpleType<Key>, SimpleType<Value>>
: never;

export type SimpleTypeSet<T extends SimpleSetToken> = T extends "Set"
? Set<any>
: T extends `Set<${infer Type extends SetTypes}>`
// eslint-disable-next-line no-use-before-define
? Set<SimpleType<Type>>
: never;


// export type SimpleTypeContainer<T extends SimpleContainerToken> =

// : never;


/**
 * **SimpleType**`<T>`
 *
 * A type utility which takes a `SimpleToken` and converts it to
 * it's _type_ in the type system.
 *
 * **Related:** `ToShapeToken`, `StructuredStringType`
 */
export type SimpleType<T extends SimpleToken> = T extends SimpleScalarToken
? SimpleTypeScalar<T>
: T extends SimpleDictToken
? SimpleTypeDict<T>
: T extends SimpleArrayToken
? SimpleTypeArray<T>
: T extends SimpleMapToken
? SimpleTypeMap<T>
: T extends SimpleSetToken
? SimpleTypeSet<T>
: T extends SimpleUnionToken
? SimpleTypeUnion<T>
: never;

export type StructuredStringType = any;
