import { Container, IsArray } from "@inferred-types/types";


type GenNode<
  K extends string | number,
  IsRoot extends boolean,
  IsArray extends boolean
> = IsArray extends true
? K extends `${number}`
  ? IsRoot extends true
    ? `${K}`
    : `.${K}`
  : never
: IsRoot extends true
  ? `${K}`
  : `.${K}`


type GenList<
  TContainer,
  IsRoot extends boolean = true,
  K extends keyof TContainer = keyof TContainer
> = K extends string | number
? GenNode<K,IsRoot, IsArray<TContainer>> | (
  TContainer[K] extends object
    ? `${GenNode<K,IsRoot, IsArray<TContainer>>}${GenList<TContainer[K],false>}`
    : never
  )
: never;

/**
 * **DotPathFor**`<T>`
 *
 * Provides a union of all valid _dot paths_ for the container
 * `T`.
 *
 * - If `T` is _not_ a container then it will resolve to
 * `"" | null` because `T` can not be dereferenced.
 * - If `T` is a _wide_ container than it will resolve to `string | null` as
 * nothing can be determined at design time
 */
export type DotPathFor<
  TContainer
> = TContainer extends Container
? "" | GenList<TContainer, true>
: "";
