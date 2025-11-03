import type { Percentage } from "inferred-types/types";

/**
 * **RGBA**
 *
 * An object representation of an RGB value with
 * an alpha channel.
 */
export type RGBA = {
    /** red  */
    r: number;
    /** green */
    g: number;
    /** blue */
    b: number;
    /** alpha value; should have value between 0 and 1 */
    a: Percentage;
};
