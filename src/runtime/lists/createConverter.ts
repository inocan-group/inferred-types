import { Narrowable } from "src/types";
import { ConverterShape, AvailableConverters } from "types/lists/ConvertAndMap";
import { boxDictionaryValues } from "../literals/box";
import { wide } from "../literals/wide";
import { ifSameType } from "../boolean-logic";

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
  S extends Narrowable = undefined,
  N extends Narrowable = undefined,
  B extends Narrowable = undefined,
  O extends Narrowable = undefined
>(mapper: Partial<ConverterShape<S, N, B, O>>) {
  type Mapper = Required<typeof mapper>;
  const converter = boxDictionaryValues(mapper as Mapper);

  return <T extends AvailableConverters<S, N, B, O>>(input: T) => {
    const v = ifSameType(
      input,
      wide.string,
      (iStr) => converter.string.unbox(iStr),
      (i) =>
        ifSameType(
          i,
          wide.number,
          (iNum) => converter.number.unbox(iNum),
          (i) =>
            ifSameType(
              i,
              wide.boolean,
              (iBool) => converter.boolean.unbox(iBool),
              (i) =>
                ifSameType(
                  i,
                  {} as Record<string, any>,
                  (iObj) => converter.object.unbox(iObj),
                  (i) => i as unknown
                )
            )
        )
    );
    return v;
  };
}
