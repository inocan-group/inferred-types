import { Container, EmptyObject, ExplicitKeys, IfNever, NumericKeys, Tuple, UnionToTuple } from "src/types";


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
> = IfNever<
TContainer,
never,
TContainer extends EmptyObject
    ? never
    : "fuck"
>;

