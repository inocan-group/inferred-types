import {
  isObject
} from "inferred-types/runtime";

import {
  CssKeyframeTimestamp,
  CssDefinition,
  HandleDoneFn,
  EmptyObject,
  Dictionary,
  AfterFirst,
  ObjectToCssString,
  First,
  ExpandDictionary,
  ObjectToKeyframeString
} from "inferred-types/types";

export type KeyframeApi<
  TState extends readonly [CssKeyframeTimestamp, CssDefinition][] | []
> = {
  state: Readonly<TState>,
  add: <
    TStage extends CssKeyframeTimestamp,
    TDefn extends CssDefinition
  >(
    stage: TStage,
    defn: TDefn
  ) => KeyframeApi<[...TState, [TStage, TDefn]]>
  done(): Readonly<TState>;
}

const api = <
  TState extends readonly [CssKeyframeTimestamp, CssDefinition][] | []
>(state: TState = [] as TState): KeyframeApi<TState> => ({
  state,

  add: <
    TStage extends CssKeyframeTimestamp,
    TDefn extends CssDefinition
  >(stage: TStage, defn: TDefn) => {
    return api(
      [...state, [stage, defn]]
    )
  },
  done() {
    return state
  }
});


type FrameToCSS<
  T extends readonly [CssKeyframeTimestamp, CssDefinition][],
  R extends Dictionary = EmptyObject
> = [] extends T
? ObjectToKeyframeString<
    ExpandDictionary<R>, true
  >
: FrameToCSS<
    AfterFirst<T>,
    R & Record<
      First<T>[0],
      ObjectToCssString<First<T>[1]>
    >
  >;

export type CssKeyframeCallback = (cb: KeyframeApi<[]>) => unknown;

const hasDone = <T>(val: T): val is KeyframeApi<any[]> & T => {
  return isObject(val) && "done" in val && typeof val.done === "function"
}

const frameToCss = <T extends readonly [CssKeyframeTimestamp, CssDefinition][]>(frames: T) => {
  const tuples: [CssKeyframeTimestamp, string][] = frames.map( ([ts, defn]) => [
    ts,
    Object.keys(defn).reduce(
      (acc, i) => [
        ...acc,
        `${i}: ${String(defn[i as keyof typeof defn])}`
      ], [] as string[]
    ).join("; ")
  ]);

  return tuples.map(([ts,defn]) => `  ${ts} { ${defn} }`).join("\n");
}

export const createCssKeyframe = <
  TName extends string,
  TKeyframes extends CssKeyframeCallback
>(
  name: TName,
  keyframes: TKeyframes
) => {
  /** api surface */
  const surface = api([]);
  /** return from user callback */
  const rtn = keyframes(surface);

  const frames = (
    hasDone(rtn) ? rtn.done() : rtn
  ) as unknown as HandleDoneFn<ReturnType<TKeyframes>>;

  type Frames = typeof frames;
  type Returns = FrameToCSS<Frames>;

  return {
    name,
    keyframes: frames,
    css: `@keyframes ${name} {\n${frameToCss(frames)}\n}` as unknown as `@keyframes ${TName} ${Returns}`
  }

}

