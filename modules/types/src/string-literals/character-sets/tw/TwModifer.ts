import type { TW_MODIFIERS_CORE, TW_MODIFIERS_ORDER, TW_MODIFIERS_RELN } from "inferred-types/constants";
import type { Replace } from "inferred-types/types";
import type { TwSizeResponsive } from "./TwSize";

/**
 * The _core_ state modifiers which are used frequently in
 */
export type TwModifier__Core = typeof TW_MODIFIERS_CORE[number];

/**
 * Tailwind state modifiers which select on the _order_ of an item in the list
 */
export type TwModifier__Order = typeof TW_MODIFIERS_ORDER[number];

/**
 * Tailwind state modifiers which select on a relationship to another node (peer, child, etc.)
 */
export type TwModifier__Reln = Replace<typeof TW_MODIFIERS_RELN[number], `{{string}}`, `${string}`>;

export type TwModifier__Size = TwSizeResponsive;

/**
 * Tailwind state modifiers
 *
 * **Related:** `TwState__Core`, `TwState__Order`, `TwState__Reln`, `TwPrefix`
 */
export type TwModifier<T extends string = never> = TwModifier__Core
  | TwModifier__Order
  | TwModifier__Reln
  | TwModifier__Size
  | T;
