
/**
 * The _timestamp_ of a [CSS keyframe animation](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
 * (e.g., "from", "to", "50%")
 */
export type CssKeyframeTimestamp =
| "from"
| "to"
| `${number}%`
| `${number}%${string},${number}%`;

