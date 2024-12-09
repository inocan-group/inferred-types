import {Something} from "inferred-types/types";

/**
 * **NotNull**
 *
 * Represents **every** type except for the **null** value.
 */
export type NotNull = Something | undefined;
