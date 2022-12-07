import { Keys, Narrowable } from "src/types";
import {
  ConverterShape,
  ConverterInputType,
  AvailableConverters,
} from "src/types/lists/ConvertAndMap";
import { boxDictionaryValues } from "../literals/box";
import { wide } from "../literals/wide";
import { ifSameType } from "../type-checks";

/**
 * **createConverter**(mapper)
 *
 * A runtime utility which allows for the creation of a function which
 * receives multiple wide types (string, number, boolean, object) and then transform it
 * based on the "wide type" but while retaining the potentially narrow values passed in.
 */
export function createConverter<
  S extends Narrowable = undefined,
  N extends Narrowable = undefined,
  B extends Narrowable = undefined,
  O extends Narrowable = undefined
>(mapper: Partial<ConverterShape<S, N, B, O>>) {
  type Mapper = Required<typeof mapper>;
  const converter = boxDictionaryValues(mapper as Mapper);
  type MapTypes = AvailableConverters<S, N, B, O>;

  return <T extends MapTypes>(input: T) => {
    const v = ifSameType(
      input,
      wide.string,
      <T extends string>(i: T) => converter.string.unbox(i),
      (i) =>
        ifSameType(
          i,
          wide.number,
          (i) => converter.number.unbox(i),
          (i) =>
            ifSameType(
              i,
              wide.boolean,
              (i) => converter.boolean.unbox(i),
              (i) => converter.object.unbox(i)
            )
        )
    );
    return v;
  };
}
