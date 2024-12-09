import type {
  Contains,
  DotPathFor,
  IsContainer,
  IsDotPath,
  IsEqual,
  IsObjectLiteral,
  IsTuple,
} from "inferred-types/types";

/**
 * **IsValidDotPath**`<TContainer,TDotPath>`
 *
 * - if `TContainer` is a literal value than it will validate against
 * the _actual_ dot paths which are valid for the container.
 * - if `TContainer` is a wide container type then it will generically validate
 * whether the dot path _could_ be a valid path.
 * - if `TContainer` isn't a container at all then the only valid dot path is
 * an empty string
 * - a DotPath of either "" or null is _always_ valid because these are _identity_
 * paths that simply return the container.
 */
export type IsValidDotPath<
  TContainer,
  TDotPath extends string | null,
> = IsEqual<TDotPath, null> extends true
  ? true
  : IsObjectLiteral<TContainer> extends true
    ? IsTuple<TContainer> extends true
      ? Contains<DotPathFor<TContainer>, TDotPath>
      : IsContainer<TContainer> extends true
        ? IsDotPath<TDotPath>
        : IsEqual<TDotPath, ""> extends true
          ? true
          : false
    : IsContainer<TContainer> extends true
      ? IsDotPath<TDotPath>
      : IsEqual<TDotPath, ""> extends true
        ? true
        : false;
