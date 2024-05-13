import { Concat, Container, Throw, ToString } from "src/types/index";

type InvalidOp<TIndex extends PropertyKey, TUtility extends string> = Throw<
  "invalid-operation", 
  Concat<["Attempt to index a non-container with ", TIndex]>,
  TUtility,
  { library: "inferred-types"; key: TIndex }
>;

type NotFound<TIndex extends PropertyKey, TUtility extends string> = Throw<
  "index-not-found",
  `The index '${ToString<TIndex>}' was not found on the container`,
  TUtility,
  { library: "inferred-types"; key: TIndex }
>;



/**
 * **IfIndexAt**`<TContainer,TIndex,[IF],[ELSE]>`
 * 
 * Branching utility based on whether `TContainer`:
 * 1. is a Container
 * 2. has a key/index of `TIndex`
 * 
 * #### Default values
 * If `IF` is not specified then it will narrow the `TContainer` to include
 * the intersection with `Container`.
 * 
 * If `ELSE` is not specified it will result in one of two errors:
*    - `TContainer` was not a container → `ErrorCondition<"invalid-operation">`
*    - `TContainer` _is_ a container but doesn't have the key → 
 * `ErrorCondition<"index-not-found">`
 * 
 * **Related:** `IfNoIndexAt`
 */
export type IfIndexAt<
  TContainer,
  TIndex extends PropertyKey,
  IF = TContainer & Container,
  ELSE = TContainer extends Container
    ? NotFound<TIndex,"IfIndexAt">
    : InvalidOp<TIndex, "IfIndexAt">
> = TContainer extends Container
? TIndex extends keyof TContainer
  ? IF
  : ELSE
: ELSE;

/**
 * **IfNoIndexAt**`<TContainer,TIndex,[IF],[ELSE]>`
 * 
 * Branching utility based on whether `TContainer`:
 * 1. is a Container
 * 2. has a key/index of `TIndex`
 * 
 * #### Default values
 * If `IF` is not specified it will result in one of two errors:
 *    - `TContainer` was not a container → `ErrorCondition<"invalid-operation">`
 *    - `TContainer` _is_ a container but doesn't have the key → 
 * `ErrorCondition<"index-not-found">`
 * 
 * If `ELSE` is not specified then it will narrow the `TContainer` to include
 * the intersection with `Container`.
 * 
 * **Related:** `IfNoIndexAt`
 */
export type IfNoIndexAt<
  TContainer,
  TIndex extends PropertyKey,
  IF = TContainer extends Container
  ? NotFound<TIndex,"IfIndexAt">
  : InvalidOp<TIndex, "IfIndexAt">,
  ELSE = TContainer extends Container ? TIndex extends keyof TContainer ? TContainer[TIndex] : never : never
> = TContainer extends Container
? TIndex extends keyof TContainer
  ? ELSE
  : IF
: ELSE;
