import {
  TwColor,
  TwLuminosity,
  TwLuminosityLookup,
  TwChromaLookup,
  TwHue
} from "src/types/index";
import { TW_CHROMA, TW_LUMINOSITY, TW_HUE } from "inferred-types/dist/constants/index"



type Rtn<
  TColor extends TwColor,
  TLum extends TwLuminosity
> =
TLum extends keyof TwLuminosityLookup
? TLum extends keyof TwChromaLookup
  ? TColor extends keyof TwHue
    ? `oklch(${TwLuminosityLookup[TLum]} ${TwChromaLookup[TLum]} ${TwHue[TColor]}) `
    : never
  : never
: never;

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
  return `oklch(${lum} ${chroma} ${hue})` as unknown as Rtn<TColor,TLum>
}
