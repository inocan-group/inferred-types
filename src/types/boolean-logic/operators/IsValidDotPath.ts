import { 
  Contains, 
  DotPathFor, 
  IsContainer, 
  IsDotPath, 
  IsEqual, 
  IsObjectLiteral, 
  IsTuple, 
} from "src/types/index";


/**
 * **IsValidDotPath**`<TContainer,TDotPath>`
 * 
 * - if `TContainer` is a literal value than it will validate against
 * the _actual_ dot paths which are valid for the container. 
 * - if `TContainer` is a wide container type then it will generically validate 
 * whether the dot path _could_ be a valid path.
 * - if `TContainer` isn't a container at all then the only valid dot path is
 * an empty string
 */
export type IsValidDotPath<
  TContainer,
  TDotPath extends string
> = IsObjectLiteral<TContainer> extends true
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

