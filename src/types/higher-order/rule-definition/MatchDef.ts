
import { OpHandler , MatchOp, MatchParams, AsArray } from "src/types";

/**
 * **MatchDef**`<TOp>`
 * 
 * A tuple definition of a future matching operation.
 */
export type MatchDef<
  TOp extends MatchOp,
  TParams extends AsArray<MatchParams<TOp>> = AsArray<MatchParams<TOp>>
> = [
  "match-def",
  TOp,
  TParams,
  OpHandler,
];

