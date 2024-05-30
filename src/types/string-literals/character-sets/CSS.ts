import { OptionalSpace } from "./OptionalSpace";

type Ratio = `${number}${OptionalSpace}/${OptionalSpace}${number}`;
type One = `1`;
type Special = "inherit" | "initial" | "revert" | "revert-layer" | "unset";
type Auto = "auto" | `auto ${Ratio}` | `${Ratio} auto`;

/**
 * **CssAspectRatio**
 * 
 * Allowed values for CSS's `aspect-ratio` property.
 */
export type CssAspectRatio = Ratio | One | Special | Auto;
