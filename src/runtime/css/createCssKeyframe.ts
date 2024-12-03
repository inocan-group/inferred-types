import { handleDoneFn } from "inferred-types/runtime";

import {
  CssKeyframeTimestamp,
  CssDefinition,
  CssKeyframeTimestampSuggest,
  As,
  Join,
  HandleDoneFn
} from "inferred-types/types";

type KeyframeApi<
  TState extends readonly [CssKeyframeTimestamp, CssDefinition][] | []
> = {
  state: Readonly<TState>,
  add: <
    TStage extends CssKeyframeTimestampSuggest,
    TDefn extends CssDefinition
  >(
    stage: TStage,
    defn: TDefn
  ) => KeyframeApi<As<[...TState, [TStage, TDefn]], readonly [CssKeyframeTimestamp, CssDefinition][]>>;
  done(): Readonly<TState>;
}

const api = <
  TState extends readonly [CssKeyframeTimestamp, CssDefinition][] | []
>(state: TState): KeyframeApi<TState> => ({
  state,

  add: <
    TStage extends CssKeyframeTimestampSuggest,
    TDefn extends CssDefinition
  >(stage: TStage, defn: TDefn) => {
    return api([...state, [stage as unknown as CssKeyframeTimestamp, defn]]) as KeyframeApi<As<[...TState, [TStage, TDefn]], readonly [CssKeyframeTimestamp, CssDefinition][]>>;
  },
  done() {
    return state
  }
});

type Frame<
  T extends readonly [CssKeyframeTimestamp, CssDefinition][],
> = Join<{
  [K in keyof T]: `${T[K][0]} { ... }`
}, "\n">



type KeyframeCallback = (cb: KeyframeApi<[]>) => unknown;

export const createCssKeyframe = <
  TName extends string,
  TKeyframes extends KeyframeCallback
>(
  name: TName,
  keyframes: TKeyframes
) => {

  const frames = (
    handleDoneFn(keyframes(api([]))) as readonly [CssKeyframeTimestamp, CssDefinition][]
  ).map(([timestamp, defn]) => {
    return `\n${timestamp} ${String(defn)}`
  }) as Frame< HandleDoneFn<ReturnType<TKeyframes>> >;


  return {
    name,
    frames: keyframes,
    css: `@keyframes ${name} { ${frames} }` as `@keyframes ${TName} {${string}}`
  }

}
