import type { Suggest } from "inferred-types/types";

/**
 * The _timestamp_ of a [CSS keyframe animation](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
 * (e.g., "from", "to", "50%")
 */
export type CssKeyframeTimestamp =
  | "from"
  | "to"
  | `${number}%`
  | `${number}%${string},${number}%`;

export type CssKeyframeTimestampSuggest = Suggest<
  "from" |
  "to" |
  "10%" |
  "20%" |
  "30%" |
  "40%" |
  "50%" |
  "60%" |
  "70%" |
  "80%" |
  "90%" |
  "100%" |
  "45%, 55%"
>;
