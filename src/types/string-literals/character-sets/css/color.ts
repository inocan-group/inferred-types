import { HexadecimalChar } from "../Hexadecimal";
import { OptionalSpace } from "../OptionalSpace";


export type CssColorModel =
| "rgb"
| "hsl"
| "hsb"
| "lab"
| "oklch";

export type CssColorSpace =
| "cie1931"
| "p3"
| "sRGB"
| "AdobeRGB"
| "ProPhoto RGB"
| "rec2020";


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



/**
 * [**CssOkLch**](https://oklch.com/#70,0.1,122,100)`(lightness, chroma, hue)`
 *
 * - Lightness is critical to **contrast** between _background_ and _foreground_ elements
 * - Saturation levels are seen in _chroma_ values.
 * - Hue distinguishes the actual color you're viewing
 */
export type CssOkLch =
| `oklch(${number}% ${number} ${number})`

/**
 * a hexadecimal color representation for CSS
 */
export type CssHexColor = `#${HexadecimalChar}${HexadecimalChar}${string}`;

