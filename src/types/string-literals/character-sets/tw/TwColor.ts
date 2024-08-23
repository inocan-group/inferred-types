

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
 * all of the [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * named colors.
 */
export type TwColor =
| TwNeutralColor
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
export type TwColorWithLuminosity = `${TwColor}-${TwLuminosity}`

/**
 * **TwColorWithLuminosityOpacity**
 *
 * Combines the [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * color _name_ with the allowed _luminosity_ levels, and the opacity.
 *
 * **Related:** `TwColorOption`, `TwColorWithLuminosity`, `TwColor`, `TwNeutralColor`
 */
export type TwColorWithLuminosityOpacity = `${TwColorWithLuminosity} / ${number}`


/**
 * **TwColorOption**
 *
 * A [TailwindCSS](https://tailwindcss.com/docs/customizing-colors) color
 * option which optionally can include
 */
export type TwColorOption = TwColorWithLuminosity | TwColorWithLuminosityOpacity;
