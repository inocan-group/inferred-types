import { TW_CHROMA, TW_HUE, TW_LUMINOSITY } from "inferred-types/dist/constants/index";
import { Mutable } from "src/types/index";


/**
 * The [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * named colors which represent variations of grayscale/neutral colors.
 */
export type TwNeutralColor =
| "slate"
| "gray"
| "zinc"
| "neutral"
| "stone";

/**
 * the _vibrant_ [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * named colors.
 */
export type TwVibrantColor =
| "red"
| "orange"
| "amber"
| "yellow"
| "lime"
| "green"
| "emerald"
| "teal"
| "cyan"
| "sky"
| "blue"
| "indigo"
| "violet"
| "purple"
| "fuchsia"
| "pink"
| "rose";

export type TwStaticColor = "white" | "black";

/**
 * all [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * named colors, including neutral gradients, vibrant colors, and static
 * colors (white, black).
 *
 * **Related:** `TwNeutralColor`, `TwVibrantColor`, `TwStaticColor`
 */
export type TwColor = TwNeutralColor | TwVibrantColor | TwStaticColor;


/**
 * all of the [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * luminosity levels.
 */
export type TwLuminosity =
| "50"
| "100"
| "200"
| "300"
| "400"
| "500"
| "600"
| "700"
| "800"
| "900"
| "950";

/**
 * **TwColorWithLuminosity**
 *
 * Combines the [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * color _name_ with the allowed _luminosity_ levels.
 *
 * **Related:** `TwColorOption`, `TwColorWithLuminosityOpacity`, `TwColor`, `TwNeutralColor`
 */
export type TwColorWithLuminosity =
| `${TwNeutralColor}-${TwLuminosity}`
| `${TwVibrantColor}-${TwLuminosity}`
| TwStaticColor;

/**
 * **TwColorWithLuminosityOpacity**
 *
 * Combines the [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * color _name_ with the allowed _luminosity_ levels, and the opacity.
 *
 * **Related:** `TwColorOption`, `TwColorWithLuminosity`, `TwColor`, `TwNeutralColor`
 */
export type TwColorWithLuminosityOpacity = `${TwColorWithLuminosity}/${number}`


/**
 * **TwColorOption**
 *
 * A [TailwindCSS](https://tailwindcss.com/docs/customizing-colors) color
 * option which optionally can include
 */
export type TwColorOption = TwColorWithLuminosity | TwColorWithLuminosityOpacity;


export type TwLuminosityLookup = Mutable<typeof TW_LUMINOSITY>;
export type TwLumi50 = typeof TW_LUMINOSITY["50"];
export type TwLumi100 = typeof TW_LUMINOSITY["100"];
export type TwLumi200 = typeof TW_LUMINOSITY["200"];
export type TwLumi300 = typeof TW_LUMINOSITY["300"];
export type TwLumi400 = typeof TW_LUMINOSITY["400"];
export type TwLumi500 = typeof TW_LUMINOSITY["500"];
export type TwLumi600 = typeof TW_LUMINOSITY["600"];
export type TwLumi700 = typeof TW_LUMINOSITY["700"];
export type TwLumi800 = typeof TW_LUMINOSITY["800"];
export type TwLumi900 = typeof TW_LUMINOSITY["900"];
export type TwLumi950 = typeof TW_LUMINOSITY["950"];


export type TwChromaLookup = Mutable<typeof TW_CHROMA>;

/**
 * the possible values of Tailwind Luminosity values when using
 * **okhsl** color values.
 *
 * **Related:** `TwChromaLookup`, `TwChroma50`, ...
 */
export type TwChroma = typeof TW_CHROMA[TwLuminosity];

export type TwChroma50 = typeof TW_CHROMA["50"];
export type TwChroma100 = typeof TW_CHROMA["100"];
export type TwChroma200 = typeof TW_CHROMA["200"];
export type TwChroma300 = typeof TW_CHROMA["300"];
export type TwChroma400 = typeof TW_CHROMA["400"];
export type TwChroma500 = typeof TW_CHROMA["500"];
export type TwChroma600 = typeof TW_CHROMA["600"];
export type TwChroma700 = typeof TW_CHROMA["700"];
export type TwChroma800 = typeof TW_CHROMA["800"];
export type TwChroma900 = typeof TW_CHROMA["900"];
export type TwChroma950 = typeof TW_CHROMA["950"];


export type TwHue = Mutable<typeof TW_HUE>;
