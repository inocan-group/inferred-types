
import type {
  Narrowable,
  ConverterDefn,
  Tuple,
  Nothing,
  AnyObject,
  TypedFunction
} from "inferred-types/types";

import { Never } from "inferred-types/constants";
import { isNothing, isObject } from "inferred-types/runtime";

type CallIfDefined<
  Handler
> = Handler extends TypedFunction
  ? ReturnType<Handler>
  : never;

type ConversionResult<
  TConvert extends Partial<

    ConverterDefn<any, any, any, any, any, any>
  >,
  TInput extends Narrowable | Tuple
> = TInput extends string
  ? CallIfDefined<TConvert["string"]>
  : TInput extends number
  ? CallIfDefined<TConvert["number"]>
  : TInput extends boolean
  ? CallIfDefined<TConvert["boolean"]>
  : TInput extends AnyObject
  ? CallIfDefined<TConvert["object"]>
  : TInput extends Tuple
  ? CallIfDefined<TConvert["tuple"]>
  : TInput extends Nothing
  ? CallIfDefined<TConvert["nothing"]>
  : never;

/**
 * **createConverter**(mapper)
 *
 * A runtime utility which allows for the creation of a function which
 * receives multiple wide types (string, number, boolean, object) and then transform it
 * based on the "wide type" but while retaining the potentially narrow values passed in.
 *
 * The number of wide types which the converter will accept is based on how it configured
 * as there are discrete functions which must be passed in for handling: strings, numbers,
 * booleans, and "objects" (aka, Record<string,any>).
 *
 * ```ts
 * // handles strings and numbers
 * const convert = createConverter({
 *    string: s => `the string was ${s}`,
 *    number: n => `the number was ${n}`,
 * });
 * ```
 */
export function createConverter<
  TStr extends Narrowable = never,
  TNum extends Narrowable = never,
  TBool extends Narrowable = never,
  TObj extends Narrowable = never,
  TTuple extends Narrowable = never,
  TNothing extends Narrowable = never
>(mapper: Partial<ConverterDefn<TStr, TNum, TBool, TObj, TTuple, TNothing>>) {
  return <TInput extends Narrowable | Tuple>(input: TInput) => {
    let result: unknown;
    if (isNothing(input)) {
      result = (mapper.nothing
        ? mapper.nothing(input as TInput & Nothing)
        : Never
      )
    } else if (isObject(input)) {
      result = (mapper.object
        ? mapper.object(input as TInput & AnyObject)
        : Never
      )
    } else {
      switch (typeof input) {
        case "string":
          result = (mapper.string
            ? mapper.string(input)
            : Never);
          break;
        case "number":
        case "bigint":
          result = (mapper.number
            ? mapper.number(input as any)
            : Never);
          break;
        case "boolean":
          result = (mapper.boolean
            ? mapper.boolean(input as any)
            : Never);
          break;
        default:
          throw new Error(`Unhandled type: ${typeof input}`);
      }
    }
    return result as ConversionResult<typeof mapper, TInput>;
  };

}
