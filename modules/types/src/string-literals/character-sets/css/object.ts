import type { CssSizing } from "./sizing";

/**
 * **CssObjectFit**
 *
 * The [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) CSS property sets how the
 * content of a replaced element, such as an <img> or <video>, should be resized to fit its container.
 */
export type CssObjectFit =
    | "contain"
    | "cover"
    | "fill"
    | "none"
    | "scale-down"
    | "inherit"
    | "initial"
    | "revert"
    | "revert-layer"
    | "unset";

type Positional =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "center";

type LengthValues = "0 0" | `${CssSizing} ${CssSizing}` | `${Positional} ${CssSizing} ${Positional} ${string}`;

/**
 * **CssObjectPosition**
 *
 * The object-position CSS property specifies the alignment of the selected replaced element's
 * contents within the element's box. Areas of the box which aren't covered by the replaced
 * element's object will show the element's background.
 *
 * You can adjust how the replaced element's object's intrinsic size (that is, its natural size)
 * is adjusted to fit within the element's box using the object-fit property.
 */
export type CssObjectPosition =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "center"
    | `${LengthValues}`
    | "center"
    | "inherit"
    | "initial"
    | "revert"
    | "revert-layer"
    | "unset";
