import { Opt } from "../Optional";
import {
  TwColor,
  TwColorTarget,
  TwColorWithLuminosity,
  TwColorWithLuminosityOpacity
} from "./TwColor";

/**
 * All of the `TwColorTarget`'s combined with a color (e.g, `bg-slate`, `border-blue`)
 */
export type TwTarget__ColorName = `${TwColor}`;

/**
 * All of the combinations of a:
 *   - a `TwColorTarget` (e.g., "bg", "text", etc.)
 *   - a Tailwind color name (e.g., "slate", "blue", etc.)
 *   - a `TwLuminosity` value
 *
 * **Note:** both `white` and `black` are also allowed but don't allow variants
 * as the luminosity level is fixed.
 */
export type TwTarget__ColorLuminosity = `${TwColorTarget}-${TwColorWithLuminosity}`;


/**
 * All of the combinations of a:
 *   - a `TwColorTarget` (e.g., "bg", "text", etc.)
 *   - a Tailwind color name (e.g., "slate", "blue", etc.)
 *   - a `TwLuminosity` value
 *   - a numeric value for opacity
 *
 * Values will take the form `target-color-luminosity/opacity`.
 *
 * **Note:** both `white` and `black` are also allowed but don't allow variants
 * as the luminosity level is fixed.
 */
export type TwTarget__ColorLuminosityWithOpacity = `${TwColorTarget}-${TwColorWithLuminosityOpacity}`;


/**
* All of the combinations of a:
 *   - a `TwColorTarget` (e.g., "bg", "text", etc.)
 *   - a Tailwind color name (e.g., "slate", "blue", etc.)
 *   - a `TwLuminosity` value
 *   - _optionally_, you may include the opacity level using the `/{opacity}` syntax
 *
 * **Related:** `TwTarget__ColorLuminosityWithOpacity`, `TwTarget__ColorLuminosity`, `TwTarget__ColorName`
 */
export type TwTarget__Color = `${TwColorTarget}-${TwColorWithLuminosity}${Opt<`/${number}`>}`;

/**
 * A simpler representation of what `TwTarget__Color` provides.
 *
 * In both cases the aim is to represent combinations of:
 *
 *   - a `TwColorTarget` (e.g., "bg", "text", etc.)
 *   - a Tailwind color name (e.g., "slate", "blue", etc.)
 *   - a `TwLuminosity` value
 *   - _optionally_, you may include the opacity level using the `/{opacity}` syntax
 */
export type TwTarget__Color__Light = `${TwColorTarget}-${TwTarget__ColorName}-${number}${Opt<`/${number}`>}`;

/**
 * A `TwTarget__Color_Light` representation which also allows for modifiers to be prefixed
 * in front of the color string to help narrow the scope of when this color should be applied.
 */
export type TwTarget__ColorWithOptPrefixes = `${`${string}:` | ""}${TwTarget__Color__Light}`
