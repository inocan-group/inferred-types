import { CssKeyframeTimestamp,  CssDefinition } from "inferred-types/types";


export const createCssKeyframe = <
  TName extends string,
  TKeyframes extends readonly [CssKeyframeTimestamp, CssDefinition, string]
>(name: TName, ...keyframes: TKeyframes) => {

  return {
    name,
    frames: keyframes,
    css: [`@keyframes ${name} {`].join("\n")
  }

}
