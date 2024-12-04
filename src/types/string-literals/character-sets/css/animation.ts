import { Opt } from "../Optional";
import { CssGlobal } from "./global";
import { CssTiming } from "./props";

export type CssAnimationDelay = CssTiming;

type Direction =
| "normal"
| "reverse"
| "alternate"
| "alternate-reverse"

export type CssAnimationDirection = Direction
| `${Direction}${Opt<`, ${Direction}`>}`
| `${Direction}${Opt<`, ${Direction}`>}${Opt<`, ${Direction}`>}${string}`;

export type CssAnimationDuration = CssTiming;

type FillMode =
| "none"
| "forwards"
| "backwards"
| "both";


export type CssAnimationFillMode =
| FillMode
| `${FillMode}${Opt<`, ${FillMode}`>}`
| `${FillMode}${Opt<`, ${FillMode}`>}${Opt<`, ${FillMode}`>}${string}`;

type Count = `${number}` | "infinite"

export type CssAnimationIterationCount =
| Count
| `${Count}${Opt<`, ${Count}`>}`
| `${Count}${Opt<`, ${Count}`>}${Opt<`, ${Count}`>}${string}`;

type Composition =
| "replace"
| "add"
| "accumulate";

export type CssAnimationComposition =
| Composition
| `${Composition}${Opt<`, ${Composition}`>}`
| `${Composition}${Opt<`, ${Composition}`>}${Opt<`, ${Composition}`>}${string}`;

type TimingFunction =
| "ease"
| "ease-in"
| "ease-out"
| "ease-in-out"
| "linear"
| "step-start"
| "step-end"
| `cubic-bezier(${string})`
| `linear(${string})`
| `steps(${string})`;

export type CssAnimationTimingFunction =
| TimingFunction
| `${TimingFunction}${Opt<`, ${TimingFunction}`>}${string}`;

type PlayState = "paused" | "running";

export type CssAnimationPlayState =
| PlayState
| `${PlayState}${Opt<`, ${PlayState}`>}`
| `${PlayState}${Opt<`, ${PlayState}`>}${Opt<`, ${PlayState}`>}${string}`;

export type CssAnimation = `${CssAnimationDuration} ${CssAnimationTimingFunction}${string}`
  | `${string} ${CssAnimationDuration} ${CssAnimationTimingFunction}${string}`

export type CssAnimationProperties = {
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) */
  animation?: CssAnimation | CssGlobal;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-composition) */
  "animation-composition"?: CssAnimationComposition | CssGlobal;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay) */
  "animation-delay"?: CssAnimationDelay | CssGlobal;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction) */
  "animation-direction"?: CssAnimationDirection | CssGlobal;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode) */
  "animation-fill-mode"?: CssAnimationFillMode | CssGlobal;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name) */
  "animation-name"?: string;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state) */
  "animation-play-state"?: CssAnimationPlayState | CssGlobal;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range) */
  "animation-range"?: string;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range-end) */
  "animation-range-end"?: string;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range-start) */
  "animation-range-start"?: string;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) */
  "animation-timeline"?: string;
  /** [Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) */
  "animation-timing-function"?: CssAnimationTimingFunction | CssGlobal;
}

