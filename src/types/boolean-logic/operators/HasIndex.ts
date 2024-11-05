import {
  Container,
} from "inferred-types/dist/types/index";

/**
 * **HasIndex**`<TContainer, TIdx>`
 *
 * Boolean operator that tests whether `TContainer` has the
 * index value `TIdx`.
 */
export type HasIndex<
  TContainer,
  TIdx extends PropertyKey
> = TContainer extends Container
? TIdx extends keyof TContainer
  ? true
  : false
: false
