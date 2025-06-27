import type { IT_CONTAINER_TOKENS } from "inferred-types/constants";
import type { StringLiteralTemplate } from "inferred-types/types";

type ContainerRaw = typeof IT_CONTAINER_TOKENS;
/**
 * **IT_ContainerToken**
 *
 * An internal token which represents a _container type_ of some sort.
 */
export type IT_ContainerToken = {
    [K in keyof ContainerRaw]: ContainerRaw[K] extends string
        ? StringLiteralTemplate<ContainerRaw[K]>
        : never
}[number];
