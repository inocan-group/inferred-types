import { Dictionary, EmptyObject, Tuple } from "../base-types";


export type FnFrom<
  TParams extends Tuple,
  TReturn = unknown,
  TProps extends Dictionary = EmptyObject
> = TProps extends EmptyObject
? <T extends TParams>(...args: T) => TReturn
: (<T extends TParams>(...args: T) => TReturn) & TProps
