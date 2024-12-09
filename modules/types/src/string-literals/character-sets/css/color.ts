import type { CSS_NAMED_COLORS } from "inferred-types/constants";
import type { HexadecimalChar } from "../Hexadecimal";
import type { OptionalSpace } from "../OptionalSpace";
import type { TwColorWithLuminosity } from "../tw";

export type CssNamedColors = typeof CSS_NAMED_COLORS[number];

export type CssColorModel =
  | "rgb"
  | "hsl"
  | "hsb"
  | "lab"
  | "oklch";

export type CssColorSpace =
  | "srgb"
  | "srgb-linear"
  | "display-p3"
  | "rec2020"
  | "a98-rgb"
  | "prophoto-rgb"
  | "xyz"
  | "xyz-d50"
  | "xyz-d65"
  | "hsl"
  | "hwb"
  | "lch"
  | "oklch";

export type CssColorSpacePrimary =
  | "srgb"
  | "display-p3"
  | "rec2020"
  | "hsl"
  | "hwb"
  | "lch"
  | "oklch";

export type CssRgb =
  | `rgb(${number} ${number} ${number})`
  | `rgb(${number},${OptionalSpace}${number},${OptionalSpace}${number})`;

export type CssRgba =
  | `rgba(${number} ${number} ${number})`
  | `rgba(${number},${OptionalSpace}${number},${OptionalSpace}${number})`;

/**
 * Hue, Saturation, and Lightness level (**HSL** color model)
 */
export type CssHsl =
  | `hsl(${number} ${number} ${number})`
  | `hsl(${number},${OptionalSpace}${number},${OptionalSpace}${number})`;

/**
 * Hue, Saturation, and Brightness (**HSB** color model)
 */
export type CssHsb =
  | `hsb(${number} ${number} ${number})`
  | `hsb(${number},${OptionalSpace}${number},${OptionalSpace}${number})`;

type OptionalPercent = "%" | "";

/**
 * [**CssOkLch**](https://oklch.com/)`(lightness, chroma, hue)`
 *
 * - Lightness is critical to **contrast** between _background_ and _foreground_ elements
 * - Saturation levels are seen in _chroma_ values.
 * - Hue distinguishes the actual color you're viewing
 */
export type CssOkLch =
| `oklch(${number}${OptionalPercent} ${number}${OptionalPercent} ${number})`;

/**
 * a hexadecimal color representation for CSS
 */
export type CssHexColor = `#${HexadecimalChar}${HexadecimalChar}${string}`;

export type ColorFnValue = `${number}` | `${number}%` | "none";
export type ColorFnOptOpacity = "" | ` / ${number}`;

/**
 * **CssColor**
 *
 * Intended to represent _any_ CSS color value.
 */
export type CssColor =
  | CssNamedColors
  | CssHexColor
  | CssRgb
  | CssRgba
  | CssOkLch
  | CssHsb
  | CssHsl
  | "currentcolor"
  | `color(${string})`;

export type CssColorLight =
  | CssNamedColors
  | `#${number}`
  | "currentcolor"
  | `${"rgb" | "rgba" | "hsb" | "hsl"}(${string})`
  | `color(${string})`;

/**
 * The new CSS 4 `color(colorspace v1 v2 v3 [/ alpha])` function.
 *
 * **Related:** `CssColorSpace`, `ColorFnValue`, `ColorFnOptOpacity`
 */
export type CssColorFn<
  TColorSpace extends CssColorSpace = CssColorSpace,
  TV1 extends ColorFnValue = ColorFnValue,
  TV2 extends ColorFnValue = ColorFnValue,
  TV3 extends ColorFnValue = ColorFnValue,
  TOp extends ColorFnOptOpacity = ColorFnOptOpacity,
> =
  | `color(${TColorSpace} ${TV1} ${TV2} ${TV3})${TOp}` // absolute color
  | `color(${CssColor} from ${TColorSpace} ${TV1} ${TV2} ${TV3})${TOp}`;

export type CssColorMix = `color-mix(in ${CssColorSpace}, ${CssColor}${string})`;

export type CssColorMixLight = `color-mix(in ${CssColorSpacePrimary}, ${string})`;

/**
 * **ColorParam**
 *
 * A union of color options which might be presented as user input. It includes:
 *
 * - all CSS named colors
 * - any valid CSS hex color
 * - any Tailwind Color/Luminosity pairing
 * - a `color-mix(...)` color
 */
export type ColorParam = CssNamedColors | CssHexColor | TwColorWithLuminosity | CssColorMixLight;
