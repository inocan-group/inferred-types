import { Narrowable } from "src/types";
import { ConvertType, TypeMapMatcher, TypeMapRule, TypeMapTransformer } from "src/types/type-conversion/MapType";
import { t } from "../runtime";
import { Never } from "../runtime/Never";
import { endsWith } from "../type-guards/higher-order/endsWith";
import { startsWith } from "../type-guards/higher-order/startsWith";
import { isFalsy } from "../type-guards/isFalsy";
import { isTruthy } from "../type-guards/isTruthy";
import { isTypeTuple } from "../type-guards/isTypeTuple";

/**
 * **convertType**(rules) => (value) => [converted]
 * 
 * A higher-order function which takes a set of transformation rules
 * and then _provides_ a function which will take a value which is then
 * transformed using the rules in the first step.
 * 
 * **Related:**: `ConvertType`, `TypeMapRule`
 */
export function convertType<
  TRules extends readonly TypeMapRule<TypeMapMatcher, TypeMapTransformer, any>[]
>(rules: TRules) {
  return <TValue extends Narrowable>(value: TValue): ConvertType<TValue, TRules> => {
    let matched: TypeMapRule<TypeMapMatcher, TypeMapTransformer, any> | typeof Never = Never;

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
          response = t.booleanString();
          break;
        case "AsNumericString":
          response = t.numericString();
          break;
        case "AsString":
          response = t.string("<string>");
          break;
        case "CamelCase":
          response = toCamelCase(value);
          break;
        
      }


    }


    return response as unknown as ConvertType<TValue,TRules>;
  };
}
