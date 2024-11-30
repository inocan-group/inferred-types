import { TW_MODIFIERS_SIZING } from "inferred-types/constants";

/**
 * **TwSizeResponsive**`<[T]>`
 *
 * The valid size targets you can use for Tailwind's responsive layout utilities.
 */
export type TwSizeResponsive<T extends string = never> = typeof TW_MODIFIERS_SIZING[number] | T;


