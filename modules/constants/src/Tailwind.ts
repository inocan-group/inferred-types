// eslint-disable style/quote-props

export const TW_HUE_NEUTRAL = {
    slate: 262,
    gray: 270,
    zinc: 269,
    neutral: 270,
    stone: 273,
} as const;

export const TW_HUE_VIBRANT = {
    red: 24,
    orange: 44,
    amber: 79,
    yellow: 100,
    lime: 132,
    green: 144,
    emerald: 159,
    teal: 182,
    cyan: 192,
    sky: 219,
    blue: 240,
    indigo: 268,
    violet: 283,
    purple: 294,
    fuchsia: 319,
    pink: 334,
    rose: 15,
} as const;

export const TW_HUE_STATIC = {
    black: 0,
    white: 106.37411429114086,
} as const;

/**
 * **TW_COLOR_HUE**
 *
 * The _hue_ values for [TailwindCSS](https://tailwindcss.com/docs/customizing-colors)
 * when moved into the **oklch** color space.
 */
export const TW_HUE = {
    ...TW_HUE_NEUTRAL,
    ...TW_HUE_VIBRANT,
    ...TW_HUE_STATIC,
} as const;

export const TW_LUMINOSITY = {
    "50": 97.78,
    "100": 93.56,
    "200": 88.11,
    "300": 82.67,
    "400": 74.22,
    "500": 64.78,
    "600": 57.33,
    "700": 46.89,
    "800": 39.44,
    "900": 32,
    "950": 23.78,
} as const;

export const TW_LUMIN_50 = TW_LUMINOSITY["50"];
export const TW_LUMIN_100 = TW_LUMINOSITY["100"];
export const TW_LUMIN_200 = TW_LUMINOSITY["200"];
export const TW_LUMIN_300 = TW_LUMINOSITY["300"];
export const TW_LUMIN_400 = TW_LUMINOSITY["400"];
export const TW_LUMIN_500 = TW_LUMINOSITY["500"];
export const TW_LUMIN_600 = TW_LUMINOSITY["600"];
export const TW_LUMIN_700 = TW_LUMINOSITY["700"];
export const TW_LUMIN_800 = TW_LUMINOSITY["800"];
export const TW_LUMIN_900 = TW_LUMINOSITY["900"];
export const TW_LUMIN_950 = TW_LUMINOSITY["950"];

/**
 * **TW_CHROMA**
 *
 * The possible chroma values from Tailwind CSS when using
 * the **okhsl** color model.
 *
 * **Related:** `TW_CHROMA_50`, `TW_CHROMA_100`, ...
 */
export const TW_CHROMA = {
    "50": 0.0108,
    "100": 0.0321,
    "200": 0.0609,
    "300": 0.0908,
    "400": 0.1398,
    "500": 0.1472,
    "600": 0.1299,
    "700": 0.1067,
    "800": 0.0898,
    "900": 0.0726,
    "950": 0.054,
} as const;

export const TW_CHROMA_50 = TW_CHROMA["50"];
export const TW_CHROMA_100 = TW_CHROMA["100"];
export const TW_CHROMA_200 = TW_CHROMA["200"];
export const TW_CHROMA_300 = TW_CHROMA["300"];
export const TW_CHROMA_400 = TW_CHROMA["400"];
export const TW_CHROMA_500 = TW_CHROMA["500"];
export const TW_CHROMA_600 = TW_CHROMA["600"];
export const TW_CHROMA_700 = TW_CHROMA["700"];
export const TW_CHROMA_800 = TW_CHROMA["800"];
export const TW_CHROMA_900 = TW_CHROMA["900"];
export const TW_CHROMA_950 = TW_CHROMA["950"];

/**
 * The list of "targets" where Tailwind color string references
 * can be applied to. These domains are prefixes to the color string
 * when used (e.g., `bg-green-500`)
 */
export const TW_COLOR_TARGETS = [
    "bg",
    "text",
    "border",
    "ring",
    "shadow",
    "border",
] as const;

export const TW_MODIFIERS_CORE = [
    "dark",
    "focus",
    "hover",
    "active",
    "visited",
    "disabled",
] as const;

export const TW_MODIFIERS_ORDER = [
    "first",
    "last",
    "odd",
    "even",
] as const;

export const TW_MODIFIERS_RELN = [
    "focus-within",
    "focus-visible",
    "checked",
    "peer-invalid",
    `peer-checked/{{string}}`,
] as const;

/**
 * The list of page size prefixes which Tailwind provides for adjusting to
 * device size. These are the defaults and can be customized.
 */
export const TW_MODIFIERS_SIZING = [
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
] as const;

/**
 * The list of _modifiers_ which you can target as a prefix to a Tailwind
 * class (e.g., `focus:...`, `hover:...`).
 */
export const TW_MODIFIERS = [
    ...TW_MODIFIERS_CORE,
    ...TW_MODIFIERS_ORDER,
    ...TW_MODIFIERS_SIZING,
    ...TW_MODIFIERS_RELN,
] as const;
