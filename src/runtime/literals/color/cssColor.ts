import { ColorFnOptOpacity, ColorFnValue, CssColorFn, CssColorSpace} from "inferred-types/dist/types/index";

/**
 * **cssColor**`(colorspace, v1, v2, v3, [opacity]) -> CssColorFn`
 *
 * Produces a string literal for a CSS v4 `color()` function.
 */
export const cssColor = <
  TColorSpace extends CssColorSpace,
  TV1 extends ColorFnValue,
  TV2 extends ColorFnValue,
  TV3 extends ColorFnValue,
  TOp extends undefined | ColorFnOptOpacity
  >(
    color: TColorSpace,
    v1: TV1,
    v2: TV2,
    v3: TV3,
    opacity?: TOp
  ) => {
    return `color(${color} ${v1} ${v2} ${v3}${opacity ? ` / ${opacity}`: ""}` as CssColorFn<
      TColorSpace,
      TV1,
      TV2,
      TV3,
      TOp extends ` / ${number}`
      ? TOp
      : ""
    >
  }

