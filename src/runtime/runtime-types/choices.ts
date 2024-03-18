/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import {   ChoiceRepresentation, ChoiceBuilder, MultipleChoice, Choice, Narrowable, KV, MergeKVs } from "src/types/index";
import { isString } from "../type-guards/isString";
import {  isObject } from "../type-guards/index";
import { Never } from "src/constants/Never";
import { createFnWithProps } from "../initializers";
import { handleDoneFn } from "../boolean-logic";

const chooseMany = <
  TChoices extends KV<string>,
  TForceUnique extends boolean,
  TState extends readonly unknown[] = [],
  TExclude extends string = ""
>(
  choices: TChoices, 
  forceUnique: TForceUnique, 
  state: TState = [] as unknown as TState
): MultipleChoice<TChoices, TForceUnique, TState, TExclude> => {
  const result = createFnWithProps(
    <I extends Exclude<keyof TChoices, TExclude>>(item: I) => chooseMany(
          choices,
          forceUnique,
          [...state, choices[item]]
      ),
      { 
        config: choices,  
        selected: state, 
        forceUnique,
        done: () => state
      }
  )

  return result as unknown as MultipleChoice<TChoices, TForceUnique, TState, TExclude>;
};


/**
 * **choice**(_choice representation_)
 * 
 * Receives a `ChoiceRepresentation` value and converts it into
 * a strongly typed Key/Value pair.
 */
export const choice = <
  TChoice extends ChoiceRepresentation<N,V>,
  N extends string,
  V extends Narrowable
>(choice: TChoice) => {
  return (
    isString(choice)
    ? { [choice]: choice }
    : isObject(choice)
      ? "type" in choice
        ? { [(choice as any).name as string]: handleDoneFn(choice.type) }
        : "value" in choice
          ? { [(choice as any).name as string]: choice.value }
          : Never
    : Array.isArray(choice)
      ? choice.length === 2
        ? { [String(choice[0])]: choice[1]}
        : Never
    : Never
  ) as Choice<TChoice>;
}

export const mergeChoices = <
  T extends readonly KV<string>[]
>(...choices: T): MergeKVs<T> => {
  let obj: KV<string> = {};
  for (const idx in choices) {
    obj = {
      ...obj,
      ...choices[idx as keyof typeof choices]
    }
  }
  return obj as MergeKVs<T>
}



export const choices: ChoiceBuilder = (...choices) => ({
  chooseMany: (forceUnique) => {
    return chooseMany(
      mergeChoices(...choices),
      forceUnique
    );
  }
});






