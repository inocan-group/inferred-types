import type {
  TwChromaLookup,
  TwColor,
  TwHue,
  TwLuminosity,
  TwLuminosityLookup,
} from "inferred-types/types";
import {
  TW_CHROMA,
  TW_HUE,
  TW_LUMINOSITY,
} from "inferred-types/constants";

type Rtn<
  TColor extends TwColor,
  TLum extends TwLuminosity,
> =
  TLum extends keyof TwLuminosityLookup
    ? TLum extends keyof TwChromaLookup
      ? TColor extends keyof TwHue
        ? `oklch(${TwLuminosityLookup[TLum]} ${TwChromaLookup[TLum]} ${TwHue[TColor]})`
        : never
      : never
    : never;

/**
 * **twColor**`(color, luminosity)` => `oklch(...)`
 *
 * Provides a Tailwind Color using the `oklch` color
 * specification. The output is intended to put into
 * a CSS property.
 *
 * **Related:** `twColorRgb()`
 */
export function twColor<
  TColor extends TwColor,
  TLum extends TwLuminosity,
>(
  color: TColor,
  luminosity: TLum,
): Rtn<TColor, TLum> {
  const lum: number = luminosity in TW_LUMINOSITY
    ? TW_LUMINOSITY[luminosity]
    : 0;
  const chroma: number = luminosity in TW_CHROMA
    ? TW_CHROMA[luminosity]
    : 0;
  const hue = TW_HUE[color];
  return `oklch(${lum} ${chroma} ${hue})` as unknown as Rtn<TColor, TLum>;
}
