import * as t from "io-ts";
import { PascalCase } from "./types";
import { pascalize } from "native-dash";

/**
 * Defines an `io-ts` based **model**.
 *
 * - `<T>` represents type of the model
 * - `<S>` is the model's literal type
 *
 * Note: unlink the default `io-ts` model/codec, the
 * `name` variable is an explicit type alias and not a string
 * type. This helps to preserve it's type inference even though
 * the model itself does have a runtime definition of it's type.
 */
export type IModel<M, N extends string> = Omit<t.Type<M>, "name"> & { name: N };

/**
 * **Model**
 *
 * A function which returns a `io-ts` based model/codec but with a _literal_ name
 * property, and a `kind` which uniquely distinguishes itself as a "model".
 *
 * **Note:** the name of a model is expected to be in _PascalCase_ and will be converted
 * to it if not passed in correctly.
 */
export function Model<RP extends t.Props, OP extends t.Props | {}, N extends string>(
  name: N,
  req: RP,
  optional: OP = {} as OP
) {
  const model = t.intersection([t.type(req), t.partial(optional)], name);
  type T = t.TypeOf<typeof model>;
  return {
    ...(model as t.Type<T>),
    name: pascalize(name),
  } as IModel<T, PascalCase<N>>;
}
