// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-use-before-define */
// import {
//   Choice,
//   ChoiceValue,
//   AsChoice,
//   Scalar,
//   CreateChoice,
//   ChoiceCallback,
//   ChoiceApiOptions,
//   ChoiceApiConfig,
//   ChoiceApi
// } from "src/types/index";
// import {  isDoneFn, isFunction,  isString,  isTuple,  isUndefined } from "../type-guards/index";
// import { shape } from "./shape";
// import { Never } from "src/constants/index";



// export const createChoice: CreateChoice = <
//   TName extends string,
//   TValue extends ChoiceValue
// >(name: TName, value?: TValue) => {
//   const result: any = isUndefined(value)
//     ? { name, value: name }
//     : isFunction(value)
//       ? { name, value: value(shape) }
//       : { name, value }

//   return (
//     isDoneFn(result)
//       ? result.done()
//       : result
//    ) as AsChoice<TName,TValue>;
// }

// const configureChoiceApi = <
// TChoices extends readonly Choice[],
// TOptions extends ChoiceApiOptions
// >(
//   choices: TChoices,
//   options: TOptions
// ): ChoiceApiConfig<TChoices,TOptions> => ({
//   done: () => ({} as unknown as ChoiceApi<TChoices,TOptions>),
//   allowChoicesToBeUsedOnlyOnce: () => configureChoiceApi(
//     choices,
//     {...options, unique: true}
//   ),
//   allowChoicesToBeUsedMultipleTimes: () => configureChoiceApi(
//     choices,
//     {...options, unique: false}
//   ),
//   setStyle: (style) => configureChoiceApi(
//     choices,
//     {...options, style}
//   ),
//   maximumChoices: (max) => configureChoiceApi(
//     choices,
//     {...options, max}
//   )
// });

// const toChoices = <
//   T extends readonly (string | [string, Scalar] | Choice | ChoiceCallback)[]
// >(values: T) => {
//   return values.map(i => isString(i)
//     ? {name: i, value: i }
//     : isTuple(s => s.string(), s => s.union("Scalar"))(i)
//     ? {name: i[0], value: i[1]}
//     : Never
//   );
// }


// export const createChoiceApi = <
//   TChoices extends readonly (string | [string, Scalar] | Choice | ChoiceCallback)[]
// >(...choices: TChoices) => {
//   configureChoiceApi(toChoices(choices), {
//     unique: true,
//     max: null,
//     style: "fn"
//   })
// }


export const choices = "NOT READY";
