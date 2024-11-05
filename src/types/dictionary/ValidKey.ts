import { AsArray, Container, Keys, TupleToUnion } from "inferred-types/dist/types/index";


/**
 * **ValidKey**<TContainer>
 *
 * Similar to the `Keys<T>` utility but returns a union of values
 * which are considered valid for the container.
 *
 * **Related**: `Keys`
 */
export type ValidKey<
  TContainer extends Container
> = TupleToUnion<
  AsArray<Keys<TContainer>>
>;
