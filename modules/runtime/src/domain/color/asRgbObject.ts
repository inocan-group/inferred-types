import { CSS_COLOR_LOOKUP } from "inferred-types/constants";
import { isCssNamedColor, isHexColor, isRgbaObject, isRgbObject } from "inferred-types/runtime";
import { RGB, RGBA } from "inferred-types/types";


export function asRgbObject<T extends string | RGB | RGBA>(rgb: T) {
    return (
        isRgbObject(rgb)
            ? rgb
            : isRgbaObject(rgb)
            ? {
                r: rgb.r,
                g: rgb.g,
                b: rgb.b
            }
            : isCssNamedColor(rgb)
                ? asRgbObject(CSS_COLOR_LOOKUP[rgb] as string)
            : isHexColor(rgb)
                ?

    )

}
