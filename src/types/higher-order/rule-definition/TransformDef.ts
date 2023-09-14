
import { TransformOp, TransformParams  } from "src/types";

/**
 * **TransformDef**`<TOp>`
 * 
 * A tuple definition of a future transform operation.
 */
export type TransformDef<
  TOp extends TransformOp,
  TParams extends AsArray<TransformParams<TOp>> = AsArray<TransformParams<TOp>> 
> = [
  "transform-def",
  TOp,
  TParams,
  OpHandler,
];
