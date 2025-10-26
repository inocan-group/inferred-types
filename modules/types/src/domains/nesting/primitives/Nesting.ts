import type { KnownNestingConfig, NestingKeyValue, NestingTuple } from "inferred-types/types";

/**
 * **Nesting**
 *
 * A _nesting_ rule configuration. Can take one of three forms:
 *
 * 1. `NestingKeyValue` - matching START and END tokens
 * 2. `NestingTuple` - unmatched START and END tokens
 * 3. `NestingConfig__Named` - a set of pre-configured rules which
 * are seen to have high reuse potential.
 */
export type Nesting = NestingKeyValue | NestingTuple | KnownNestingConfig;
