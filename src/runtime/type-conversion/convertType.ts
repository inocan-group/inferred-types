/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Narrowable, 
  ConvertType, 
  TypeTransformRule,
  TypeMapMatcher,
  TypeMapTransformer
} from "../../types/base";
import { 
  toCamelCase,
  endsWith, 
  startsWith, 
  isFalsy, 
  isTruthy, 
  isTypeTuple,
  kind
} from "src/runtime";
import { Never } from "src/constants";

/**
 * **convertType**(rules) => (value) => [converted]
 * 
 * A higher-order function which takes a set of transformation rules
 * and then provides a utility transform function which receives values
 * and transforms using the rules provided in the firs step.
 * 
 * **Related:**: `ConvertType`, `TypeMapRule`
 */
export function convertType<
  TRules extends readonly TypeTransformRule<TypeMapMatcher, TypeMapTransformer, any>[]
>(rules: TRules) {
  return <TValue extends Narrowable>(value: TValue): ConvertType<TValue, TRules> => {
    let matched: TypeTransformRule<TypeMapMatcher, TypeMapTransformer, any> | typeof Never = Never;

    for (const rule of rules) {
      if (matched !== Never) {
        break;
      }
      const [match, param] = rule.match;

      switch(match) {
        case "Any":
          matched = rule;
          break;
        case "EndsWith":
          if(endsWith(param as string)(value) ) {
            matched = rule;
          }
          break;
        case "Equals":
          if(typeof value === typeof param && value === param) {
            matched = rule;
          }
          break;
        case "Extends":
          if(typeof value === typeof param) {
            matched = rule;
          }
          break;
        case "Falsy":
          if(isFalsy(value)) {
            matched = rule;
          }
          break;
        case "NotEqual":
          if(value !== param && typeof value !== typeof param) {
            matched = rule;
          }
          break;
        case "Returns":
          if(typeof value === "function") {
            matched = rule;
          }
          break;
        case "StartsWith":
          if(startsWith(param as string)(value) ) {
            matched = rule;
          }
          break;
        case "Truthy":
          if(isTruthy(param)) {
            matched = rule;
          }
          break;
        
        default:
          throw new Error(`Can't convert type because rule contains unknown matcher type: ${match}`);
      }
    }

    let response: any = Never;

    if (matched !== Never) {
      const { transform } = matched;
      const [kind, params] = transform;

      switch(kind) {
        case "As":
          if (isTypeTuple(params)) {
            const [type, guard] = params;
            if (guard(value)) {
              response = type;
            } else {
              throw new Error(`Can't convert type for "${String(value)}" because transformer's type guard failed on it's reported type!`);
            }
          } else {
            throw new Error(`Can't convert type for "${String(value)}" because the transformer is malformed.`);
          }
          break;
        case "AsBooleanString":
          response = kind.boolean();
          break;
        case "AsNumericString":
          response = kind.numericString();
          break;
        case "AsString":
          response = kind.literal("<string>");
          break;
        case "CamelCase":
          response = toCamelCase(String(value));
          break;
        
      }
    }


    return response as unknown as ConvertType<TValue,TRules>;
  };
}
