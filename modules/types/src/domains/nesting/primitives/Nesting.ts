import { NestingKeyValue } from "./NestingKeyValue";
import { NestingTuple } from "./NestingTuple"


/**
 * A means of defining the scope nesting by:
 *
 * 1. providing a `NestingKeyValue` of matching START and END tokens
 * 2. providing a tuple `NestingTuple` which uses it's own heuristic
 * to defining how nesting layers are identified
 */
export type Nesting = NestingKeyValue | NestingTuple;
