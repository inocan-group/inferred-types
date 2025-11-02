import { isHexColor, isRgbaObject, isRgbObject } from "inferred-types/runtime";
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
            : isHexColor(rgb)
                ?

    )

}
