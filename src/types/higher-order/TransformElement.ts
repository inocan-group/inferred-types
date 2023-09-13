import { 
  Matcher,
  TypeTransformOp,
} from "../base";

/**
 * **TransformElement**`<TOp,TParam,[TMatcher]>`
 * 
 * A `TransformElement` is a representation a transformation operation
 * which will happen at some future time. This operation can be either:
 * 
 * - **conditional** - the execution of the transform is conditional 
 * on a `Matcher` resolving to true
 * - **unconditional** - execution of the transform is done without
 * condition at time of execution.
 */
export type TransformElement<
TOp extends TypeTransformOp = TypeTransformOp,
TParams extends readonly unknown[] = [],
TMatcher extends Matcher | never = Matcher | never,
> = [TOp,TParams, TMatcher];


