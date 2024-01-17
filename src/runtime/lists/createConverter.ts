import type { 
  Narrowable, 
  ConverterDefn, 
  Tuple,
  Nothing,
  AnyObject,
  AnyFunction
} from "src/types/index";
import { 
  isTupleType,
  isObject,
  isNothing
} from "src/runtime/index";
import { Never } from "src/constants/index";

type CallIfDefined<
  Handler
> = Handler extends AnyFunction
  ? ReturnType<Handler>
  : never;

type ConversionResult<
  TConvert extends Partial<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
>(mapper: Partial<ConverterDefn<TStr,TNum,TBool,TObj,TTuple,TNothing>>) {
  

  return <TInput extends Narrowable | Tuple>(input: TInput): ConversionResult<typeof mapper, TInput> => {
    if (isTupleType(input)) {
      return (mapper.tuple
        ? mapper.tuple(input as TInput & Tuple)
        : Never
      ) as ConversionResult<typeof mapper, TInput>;
    } else if(isNothing(input)) {
      return (mapper.nothing
        ? mapper.nothing(input as TInput & Nothing)
        : Never
      ) as ConversionResult<typeof mapper, TInput>;
    } else if(isObject(input)) {
      return (mapper.object
        ? mapper.object(input as TInput & AnyObject)
        : Never
      ) as ConversionResult<typeof mapper, TInput>;
    } else {
      switch(typeof input) {
        case "string":
          return (mapper.string
            ? mapper.string(input)
            : Never) as ConversionResult<typeof mapper, TInput>;
        case "number":
        case "bigint":
          return (mapper.number
            ? mapper.number(input)
            : Never) as ConversionResult<typeof mapper, TInput>;
        case "boolean":
          return (mapper.boolean
            ? mapper.boolean(input)
            : Never) as ConversionResult<typeof mapper, TInput>;
        default:
          throw new Error(`Unhandled type: ${typeof input}`);
      }
    }
  };

}
