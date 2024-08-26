import {
  TwColor,
  TwLuminosity,
  TwLuminosityLookup,
  TwChromaLookup,
  TwHue
} from "src/types/index";
import { TW_CHROMA, TW_LUMINOSITY, TW_HUE } from "src/constants/index"


/**
 * Provides a Tailwind Color using the `oklch` color
 * specification. The output is intended to put into
 * a CSS property.
 */
export const twColor = <
  TColor extends TwColor,
  TLum extends TwLuminosity
>(
  color: TColor,
  luminosity: TLum
) => {
  const lum = TW_LUMINOSITY[luminosity];
  const chroma = TW_CHROMA[luminosity];
  const hue = TW_HUE[color];
  return `oklch(${lum} ${chroma} ${hue})` as `oklch(${TwLuminosityLookup[TLum]} ${TwChromaLookup[TLum]} ${TwHue[TColor]})`
}
