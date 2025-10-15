/**
 * **RGB**
 *
 * An object representation of an RGB value.
 */
export type RGB = {
    /** red  */
    r: number;
    /** green */
    g: number;
    /** blue */
    b: number;
};

export type RGBA = {
    /** red  */
    r: number;
    /** green */
    g: number;
    /** blue */
    b: number;
    /** alpha value; should have value between 0 and 1 */
    a: number;
};
