import type { Expand } from "inferred-types/types";
import type { Container } from "types/base-types";

/**
 * Sets a Key on a container.
 *
 * - can add new properties
 * - can also update existing
 */
export type SetIndex<
    T extends Container,
    K extends PropertyKey,
    V
> = Expand<
    Omit<T, K> & Record<K, V>
>;
