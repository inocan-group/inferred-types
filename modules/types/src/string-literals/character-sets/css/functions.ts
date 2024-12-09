import { CssColor } from "./color";
import { CssSizing } from "./sizing";

export type CssVar = `var(--${string})`;

/**
 * A CSS variable declaration with a [fallback](https://developer.mozilla.org/en-US/docs/Web/CSS/var#syntax)
 * choice or choices.
 */
export type CssVarWithFallback = `var(--${string}, ${CssVar | CssColor})`;


/**
 * The CSS `translate()` function
 */
export type CssTranslateFn = `translate(${CssSizing})` | `translate(0)` | `translate(${CssSizing}, ${CssSizing})`

/**
 * The CSS [`round()`](https://developer.mozilla.org/en-US/docs/Web/CSS/round) function
 */
export type CssRound = `round(${CssVar}, ${CssSizing})`
| `round(${"up"|"down"|"nearest"|"to-zero"}, ${CssVar | CssSizing}, ${string})`

/**
 * The CSS [clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) function
 */
export type CssClamp = `clamp(${CssSizing}, ${string}, ${string})`;

/**
 * The CSS [calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) function.
 *
 * ```css
 * calc(100% - 80px)
 * calc(100px * sin(pi / 2))
 * calc(var(--hue) + 180)
 * lch(from aquamarine l c calc(h + 180))
 * ```
 */
export type CssCalc = `calc(${CssSizing | CssVarWithFallback}${string})`;
