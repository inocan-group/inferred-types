import type { Opt } from "../Optional";
import type { CssGlobal } from "./global";
import type { CssRotation } from "./props";
import type { CssSizing, CssSizingLight } from "./sizing";

export type CssFontFamily =
  | `"${string}"`
  | "serif"
  | "san-serif"
  | "monospace"
  | "cursive"
  | "fantasy"
  | "system-ui"
  | "ui-serif"
  | "ui-sans-serif"
  | "ui-monospace"
  | "ui-rounded"
  | "emoji"
  | "math"
  | "fansong";

export type CssFontFeatureSetting =
  | "normal"
  | "liga"
  | "tnum"
  | "smcp";

export type CssFontKerning =
  | "auto"
  | "normal"
  | "none"
  | CssGlobal;

export type CssFontPalette =
  | "normal"
  | "light"
  | "dark"
  | `--${string}`
  | `palette-mix(in ${ColorGamut},${string})`;

export type CssFontWidth =
  | "normal"
  | "ultra-condensed"
  | "extra-condensed"
  | "condensed"
  | "semi-condensed"
  | "expanded"
  | "extra-expanded"
  | "ultra-expanded"
  | `${number}%`
  | CssGlobal;

export type CssFontStyle =
  | "normal"
  | "italic"
  | "oblique"
  | `oblique ${CssRotation}`
  | CssGlobal;

export type CssFontSynthesis =
  | "none"
  | "weight"
  | "style"
  | "position"
  | "small-caps";

export type CssFontWeight =
  | "normal" | "bold"
  | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
  | "lighter" | "bolder"
  | CssGlobal;

/**
 * The font-language-override CSS property controls the use of language-specific glyphs in a typeface.
 *
 * By default, HTML's lang attribute tells browsers to display glyphs designed specifically
 * for that language. For example, a lot of fonts have a special character for the digraph
 * fi that merge the dot on the "i" with the "f." However, if the language is set to Turkish
 * the typeface will likely know not to use the merged glyph; Turkish has two versions of
 * the "i," one with a dot (i) and one without (ı), and using the ligature would incorrectly
 * transform a dotted "i" into a dotless "i."
 *
 * The font-language-override property lets you override the typeface behavior for a specific
 * language. This is useful, for example, when the typeface you're using lacks proper support
 * for the language. For instance, if a typeface doesn't have proper rules for the Azeri
 * language, you can force the font to use Turkish glyphs, which follow similar rules.
 */
export type CssFontLanguageOverride = string;

export interface CssFontProperties {
  "font-family"?:
    | CssFontFamily
    | `${CssFontFamily}, ${CssFontFamily}${string}`
    | CssGlobal;
  "font-feature-settings"?:
    | CssFontFeatureSetting
    | `${CssFontFeatureSetting} ${number | "on" | "off"}`
    | `${CssFontFeatureSetting} ${number | "on" | "off"},${string}`;
  "font-kerning"?: CssFontKerning;
  "font-language-override"?: CssFontLanguageOverride;
  "font-size"?: CssSizing
    | "xx-small"
    | "x-small"
    | "small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large"
    | "xxx-large";
  /**
   * The font-size-adjust CSS property provides a way to modify the size of lowercase
   * letters relative to the size of uppercase letters, which defines the overall
   * font-size. This property is useful for situations where font fallback can
   * occur.
   *
   * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust)
   */
  "font-size-adjust"?: CssSizingLight
    | "none"
    | `${number}`
    | `from-font${Opt<` ${CssSizingLight}`>}`
    | `cap-height${Opt<` ${CssSizingLight}`>}`
    | `ex-height${Opt<` ${CssSizingLight}`>}`
    | `ch-width${Opt<` ${CssSizingLight}`>}`
    | `ic-width${Opt<` ${CssSizingLight}`>}`
    | `ic-height${Opt<` ${CssSizingLight}`>}`;

  /**
   * The font-palette CSS property allows specifying one of the many palettes contained in a
   * color font that a user agent may use for the font. Users can also override the values in
   * a palette or create a new palette by using the @font-palette-values at-rule.
   *
   * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-palette)
   */
  "font-palette"?: CssFontPalette;

  /**
   * An alias for `font-width`
   */
  "font-stretch"?: CssFontWidth;
  /**
   * The font-stretch CSS property selects a normal, condensed, or expanded face from a font.
   *
   * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-width)
   */
  "font-width"?: CssFontWidth;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style) */
  "font-style"?: CssFontStyle;

  /**
   * The `font-synthesis` shorthand CSS property lets you specify whether or not the browser
   * may synthesize the bold, italic, small-caps, and/or subscript and superscript typefaces
   * when they are missing in the specified font-family.
   *
   * - [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis)
   */
  "font-synthesis"?: CssFontSynthesis
    | `${CssFontSynthesis} ${CssFontSynthesis}`
    | `${CssFontSynthesis} ${CssFontSynthesis} ${CssFontSynthesis}${string}`
    | CssGlobal;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) */
  "font-weight"?: CssFontWeight;
}
