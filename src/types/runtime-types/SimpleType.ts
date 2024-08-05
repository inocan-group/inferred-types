import type {
  SIMPLE_DICT_VALUES,
  SIMPLE_MAP_KEYS,
  SIMPLE_MAP_VALUES,
  SIMPLE_SET_TYPES
} from "src/constants/index";
import {
  If,
  IsEqual,
  ExpandDictionary,
  SimpleContainerToken, SimpleScalarToken, SimpleToken, SimpleUnionToken,
  Dictionary,
  AsNumber,
  CsvToStrUnion, CsvToTuple, CsvToUnion,
  UnderlyingType,
  TupleToUnion
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

export type SimpleTypeContainer<T extends SimpleContainerToken> = T extends `Dict`
? Dictionary
: T extends `Dict<string, ${infer Value extends DictValues}>`
? Dictionary<string, SimpleType<Value>>
: T extends `Dict<{id: number}>`
? { id: number; [key:string|symbol]: any }
: T extends `Dict<{id: string}>`
? { id: string; [key:string|symbol]: any }
: T extends `Dict<{${infer Prop}: number}>`
  ? If<
      IsEqual<Prop,"">,
      { id: number; [key:string|symbol]: any },
      ExpandDictionary<
        Record<Prop, number> &
        { [key:string | symbol]: any }
      >
    >
: T extends `Dict<{${infer Prop}: string}>`
  ? If<
      IsEqual<Prop,"">,
      { id: string; [key:string|symbol]: any },
      ExpandDictionary<
        Record<Prop, string> &
        { [key:string | symbol]: any }
      >
    >
: T extends "Set"
? Set<any>
: T extends `Set<${infer Type extends SetTypes}>`
? Set<SimpleType<Type>>
: T extends "Map"
? Map<any,any>
: T extends `Map<${infer Key extends MapKeys}, ${infer Value extends MapValues}>`
? Map<SimpleType<Key>, SimpleType<Value>>
: never;



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
: T extends SimpleContainerToken
? SimpleTypeContainer<T>
: T extends SimpleUnionToken
? SimpleTypeUnion<T>
: never;

export type StructuredStringType = any;




