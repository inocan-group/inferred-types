
import { OpHandler , ComparisonOp, ComparisonParams, AsArray } from "src/types";

/**
 * **MatchDef**`<TOp>`
 * 
 * A tuple definition of a future matching operation.
 */
export type MatchDef<
  TOp extends ComparisonOp,
  TParams extends AsArray<ComparisonParams<TOp>> = AsArray<ComparisonParams<TOp>>
> = [
  "match-def",
  TOp,
  TParams,
  OpHandler,
];

