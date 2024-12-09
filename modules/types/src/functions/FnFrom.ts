import type { Dictionary, EmptyObject, Tuple } from "inferred-types/types";

/**
 * **FnFrom**`<TParams,[TReturn],[TProps]>`
 *
 * Type utility  to build a type from it's constituent parts.
 */
export type FnFrom<
  TParams extends Tuple,
  TReturn = unknown,
  TProps extends Dictionary = EmptyObject,
> = TProps extends EmptyObject
  ? <T extends TParams>(...args: T) => TReturn
  : (<T extends TParams>(...args: T) => TReturn) & TProps;
