import { SIMPLE_DICT_VALUES, SIMPLE_MAP_KEYS, SIMPLE_MAP_VALUES, SIMPLE_SET_TYPES } from "src/constants/index";
import {  If, IsEqual } from "../boolean-logic";
import { AsUnion, ExpandDictionary } from "../literals";
import { Split } from "../string-literals/Split";
import { Trim } from "../type-conversion/Trim";
import { SimpleToken } from "./TypeToken";
import { Dictionary } from "../base-types";
import { AsNumber } from "../type-conversion/AsNumber";
import { CsvToStrUnion, CsvToUnion } from "../numeric-literals/CsvToTuple";

type SetTypes = typeof SIMPLE_SET_TYPES[number];
type MapKeys = typeof SIMPLE_MAP_KEYS[number];
type MapValues = typeof SIMPLE_MAP_VALUES[number];
type DictValues = typeof SIMPLE_DICT_VALUES[number];

/**
 * **SimpleType**`<T>`
 *
 * A type utility which takes a `SimpleToken` and converts it to
 * it's _type_ in the type system.
 *
 * **Related:** `ToShapeToken`, `StructuredStringType`
 */
export type SimpleType<T extends SimpleToken> = T extends "string"
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
: T extends `Dict`
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
: T extends "opt(number)"
? number | undefined
: T extends "opt(string)"
? string | undefined
: T extends "opt(boolean)"
? boolean | undefined
: T extends `opt(${infer Literal})`
? Literal
: T extends `union(${infer Literals})`
? AsUnion<Split<Literals, ",">>
: T extends `Set(${infer Type extends SetTypes})`
? Set<SimpleType<Type>>
: never;

export type StructuredStringType = any;




