/* eslint-disable no-use-before-define */
import { AfterFirst, Container, First, IndexOf, Throw } from "../..";

type ProcessContainers<
  TValues extends readonly (Container | TIgnore)[],
  TIgnore,
  TOffset extends PropertyKey | null,
  TNotFound
> = [] extends TValues
? TNotFound
: IndexOf<First<TValues>, TOffset, TIgnore> extends TIgnore
  ? ProcessContainers<AfterFirst<TValues>, TIgnore,TOffset,TNotFound>
  : IndexOf<First<TValues>, TOffset>;

type Process<
  TValues extends readonly unknown[],
  TIgnore,
  TNotFound
> = [] extends TValues
? TNotFound
: First<TValues> extends TIgnore
  ? Process<AfterFirst<TValues>,TIgnore,TNotFound>
  : First<TValues>;

/**
 * **Iff**`<TValues,[TIgnore],[TOffset],[TNotFound]>`
 * 
 * Looks through a list of values -- `TValues` -- until it finds
 * the first one which _does not_ extend `TIgnore` (which is by 
 * default set to _undefined_).
 * 
 * If it reaches the end without finding a value to use it will 
 * fall back on the `TNotFound` value which is `ErrorCondition<"not-found">`
 * by default.
 */
export type Iff<
  TValues extends readonly unknown[],
  TIgnore = undefined,
  TOffset extends PropertyKey | null = null,
  TNotFound = Throw<
    "not-found", 
    `Call to Iff utility resulted in no valid results`,
    "Iff",
    { library: "inferred-types"; values: TValues }
  >
> = TOffset extends PropertyKey
? TValues extends readonly (Container | TIgnore)[]
  ? ProcessContainers<TValues, TIgnore, TOffset, TNotFound>
  : Throw<
      "invalid-values",
      `When calling Iff with a TOffset set; the TValues generic must contain a tuple of containers!`,
      "Iff",
      { library: "inferred-types"; values: TValues; offset: TOffset }
    >
: Process<TValues,TIgnore,TNotFound>;
