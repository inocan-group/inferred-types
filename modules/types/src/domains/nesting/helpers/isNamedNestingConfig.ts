import { KNOWN_NESTING_CONFIGURATIONS } from "inferred-types/constants"
import { isString } from 'inferred-types/runtime';
import type { KnownNestingConfig } from "inferred-types/types";

/**
 * **isNamedNestingConfig**`(val)`
 *
 * A typeguard which validates that `val` is a known named
 * nesting config (e.g. `Nesting__NamedConfig`).
 */
export function isNamedNestingConfig(val: unknown): val is KnownNestingConfig {
    return isString(val) && KNOWN_NESTING_CONFIGURATIONS.includes(val as any);
}
