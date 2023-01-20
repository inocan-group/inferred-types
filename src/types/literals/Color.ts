
// https://www.w3schools.com/colors/colors_groups.asp

import { HexadecimalChar } from "../string-literals/alpha-characters";

export type NamedColor_Pink = "Pink" | "LightPink" | "HotPink" | "DeepPink" | "PaleVioletRed" | "MediumVioletRed";
export type NamedColor_Purple = "Lavender" | "Thistle" | "Plum" | "Orchid" | "Violet" | "Fuchsia" | "Magenta" | "MediumOrchid" | "DarkOrchid" | "DarkViolet" | "BlueViolet" | "DarkMagenta" | "Purple" | "MediumPurple" | "MediumSlateBlue" | "SlateBlue" | "DarkSlateBlue" | "RebeccaPurple" | "Indigo";
export type NamedColor_Red = "LightSalmon" | "Salmon" | "DarkSalmon" | "LightCoral" | "IndianRed" | "Crimson" | "Red" | "FireBrick" | "DarkRed" | "Maroon";
export type NamedColor_Orange = "Orange" | "DarkOrange" | "Coral" | "Tomato" | "OrangeRed";
export type NamedColor_Yellow = "Gold" | "Yellow" | "LightYellow" | "LemonChiffon" | "LightGoldenRodYellow" | "PapayaWhip" | "Moccasin" | "PeachPuff" | "PaleGoldenRod" | "Khaki" | "DarkKhaki";
export type NamedColor_Green = "GreenYellow" | "Chartreuse" | "LawnGreen" | "Lime" | "LimeGreen" | "PaleGreen" | "LightGreen" | "MediumSpringGreen" | "SpringGreen" | "MediumSpringGreen" | "SeaGreen" | "ForestGreen" | "Green" | "DarkGreen" | "YellowGreen" | "OliveDrab" | "DarkOliveGreen" | "MediumOliveGreen" | "MediumAquaMarine" | "DarkSeeGreen" | "LightSeaGreen" | "DarkCyan" | "Teal";
export type NamedColor_Cyan = "Aqua" | "Cyan" | "LightCyan" | "PaleTurquoise" | "Aquamarine" | "Turquoise" | "MediumTurquoise" | "DarkTurquoise"; 
export type NamedColor_Blue = "CadetBlue" | "SteelBlue" | "LightSteelBlue" | "LightBlue" | "PowerBlue" | "LightSkyBlue" | "SkyBlue" | "CornflowerBlue" | "DeepSkyBlue" | "DodgerBlue" | "RoyalBlue" | "Blue" | "MediumBlue" | "DarkBlue" | "MidnightBlue";
export type NamedColor_Brown = "Cornsilk" | "BlanchedAlmond" | "Bisque" | "NavajoWhite" | "White" | "BurlyWood" | "Tan" | "RosyBrown" | "SandyBrown" | "GoldenRod" | "DarkGoldenRod" | "Peru" | "Chocolate" | "Olive" | "SaddleBrown" | "Sienna" | "Brown";
export type NamedColor_White = "White" | "Snow" | "HoneyDew" | "MintCream" | "Azure" | "AliceBlue" | "GhostWhite" | "WhiteSmoke" | "SeaShell" | "Beige" | "OldLace" | "FloralWhite" | "Ivory" | "AntiqueWhite" | "Linen" | "LavenderBlush" | "MintyRose";
export type NamedColor_Gray = "Gainsboro" | "LightGray" | "Silver" | "DarkGray" | "DimGray" | "Gray" | `LightSlateGray` | "SlateGray" | "DarkSlateGray" | "Black";

/**
 * **NamedColor**
 * 
 * Most if not all CSS/HTML _named_ colors
 */
export type NamedColor = NamedColor_Gray | NamedColor_White | NamedColor_Brown | NamedColor_Blue | NamedColor_Cyan | NamedColor_Green | NamedColor_Yellow | NamedColor_Orange | NamedColor_Red | NamedColor_Purple | NamedColor_Pink;

/**
 * **NamedColorMinimal**
 * 
 * A minimal set of _named_ colors recognized by CSS and HTML.
 */
export type NamedColorMinimal = "Gray" | "SlateGray" | "DarkSlateGray" | "Black" | "White" | "AliceBlue" | "WhiteSmoke" | "GhostWhite" | "Brown" | "Tan" | "Cornsilk" | "Blue" | "CadetBlue" | "SteelBlue" | "PowerBlue" | "DodgerBlue" | "DarkBlue" | "Cyan" | "Turquoise" | "Aquamarine" | "Teal" | "Gold" | "Yellow" | "LightYellow" | "Moccasin" | "Orange" | "DarkOrange" | "Tomato" | "Salmon" | "Red" | "FireBrick" | "DarkRed" | "Maroon" | "Plum" | "Violet" | "Purple" | "SlateBlue" | "DarkSlateBlue" | "Indigo";

/**
 * **HexColor**
 * 
 * A color value based in hexadecimal format
 */
export type HexColor = `#${HexadecimalChar}${HexadecimalChar}${string}`;


/**
 * **RgbColor**
 * 
 * Type to enforce an `rgb()` color definition
 */
export type RgbColor = `rgb(${string},${string},${string})`;


/**
 * **RgbaColor**
 * 
 * Type to enforce an `rgba()` color definition
 */
export type RgbaColor = `rgba(${string},${string},${string},${string})`;

