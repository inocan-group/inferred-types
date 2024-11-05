import {Something} from "inferred-types/dist/types/index";

/**
 * **NotNull**
 *
 * Represents **every** type except for the **null** value.
 */
export type NotNull = Something | undefined;
