import { AfterFirst, First, Tuple } from "src/types";
import { ErrorCondition } from "src/types/errors";
import { DotPath } from "./DotPath";


type Recurse<
  TValue,
  TSegments extends Tuple<string>,
  TPath extends string
> = [] extends TSegments
? TValue
: First<TSegments> extends keyof TValue
  ? Recurse<
      TValue[First<TSegments>],
      AfterFirst<TSegments>,
      TPath
    >
  : ErrorCondition<"invalid-path-segment", `The path segment "${First<TSegments>}" is an invalid key for the container passed into ValueAtDotPath`, `ValueAtDotPath<TValue,${TPath}>`>;


export type ValueAtDotPath<
  TValue,
  TPath extends string
> = DotPath<TPath> extends string 
  ? Recurse<TValue, Split<TPath, ".">, TPath>
  : ErrorCondition<"invalid-dot-path", `The dot path of "${TPath}" is not valid and therefore we can not use it to determine type information at design time.`, "ValueAtDotPath">;
