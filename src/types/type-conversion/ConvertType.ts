import { 
  DoesExtend, 
  IsFalsy, 
  EndsWith,  
  IfEqual, 
  IsEqual, 
  IsTrue, 
  IsTruthy, 
  Returns, 
  StartsWith 
} from "src/types";

import { AfterFirst, AsArray, First, GetEach } from "src/types";
import { TypeMapMatcher } from "./convert-and-map-support/TypeMapMatcher";
import { UseTypeMapTransformer } from "./convert-and-map-support/UseTransformer";
import { TupleToUnion } from "./TupleToUnion";
import { TypeMapRule } from "./TypeMapRule";
import { UnionToTuple } from "./UnionToTuple";

type Op = TupleToUnion<GetEach<UnionToTuple<TypeMapMatcher>, 0>>;

type _Op<T extends readonly TypeMapRule[]> = First<T>["match"][0];
type _Val<T extends readonly TypeMapRule[]> = First<T>["match"][1];
type _Transformer<T extends readonly TypeMapRule[]> = First<T>["transform"][0];
type _TransformParam<T extends readonly TypeMapRule[]> = First<T>["transform"][1];

type _IfOp<
  TValue,
  TMatchers extends readonly TypeMapRule[],
  TOp extends Op,
  TIf,
  TElse
> = IfEqual<
  TOp, _Op<TMatchers>,

  TIf extends true
    // matched rule
    ? UseTypeMapTransformer<
        TValue, 
        _Transformer<TMatchers>, 
        _TransformParam<TMatchers>
      >
    : TElse, // no match
  
  TElse // not the operation
>;
  
/**
 * Uses first matcher to match value and recurses otherwise
 */
type _ConvertType<
  TValue, 
  TMatchers extends readonly TypeMapRule[],
  TElse
> = [] extends TMatchers
? TElse
: _IfOp<TValue, TMatchers, "Equals", IsEqual<TValue, _Val<TMatchers>>,
  _IfOp<TValue, TMatchers, "Extends", DoesExtend<TValue, _Val<TMatchers>>,
  _IfOp<TValue, TMatchers, "StartsWith", IsTrue<StartsWith<TValue, _Val<TMatchers> & (string | number)>>,
  _IfOp<TValue, TMatchers, "EndsWith", IsTrue<EndsWith<TValue, _Val<TMatchers> & (string | number)>>,
  _IfOp<TValue, TMatchers, "Truthy", IsTruthy<TValue>,
  _IfOp<TValue, TMatchers, "Falsy", IsFalsy<TValue>,
  _IfOp<TValue, TMatchers, "Returns", Returns<TValue, _Val<TMatchers>>,
  _IfOp<TValue, TMatchers, "Any", true,
  // no match, recurse
  _ConvertType<TValue,AfterFirst<TMatchers>,TElse>
>>>>>>>>;

/**
 * **Convert**`<TValue,TMatchers,TElse>`
 * 
 * Type utility which converts the type the value `TValue` by 
 * comparing the value to an array of matcher rules. The first 
 * matcher which matches will convert the type but if no matchers 
 * match then the `TElse` generic determines the type.
 * 
 * - The default `TElse` provided will simply return `never`.
 * 
 * A matcher is a tuple which extends `Matcher`:
 * ```ts
 * type Matcher = []
 * ```
 * 
 * **Related:** `MapType<T,M,E>`
 */
export type ConvertType<
  TValue, 
  TMatchers extends TypeMapRule | readonly TypeMapRule[],
  TElse = never
> = _ConvertType<TValue, AsArray<TMatchers>, TElse>;
