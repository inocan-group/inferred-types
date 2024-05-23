/* eslint-disable no-use-before-define */
import { 
  Dictionary, 
  If, 
  IsTrue, 
  HandleDoneFn, 
  AfterFirst, 
  First,
  ExpandRecursively,
  ShapeCallback,
  AsString,
  EmptyObject,
  Scalar,
  MergeObjects,
  As,
} from "src/types/index";


/**
 * **createChoice**(name, [value])
 * 
 * Creates a "choice" for a Choice API. Values may be:
 * 
 * - any `Scalar` value
 * - a callback of the form `s => s.literal(42)`
 * - or if left _undefined_ the value will be set to the name
 */
export type CreateChoice = <
  TName extends string,
  TValue extends ChoiceValue
>(name: TName, value?: TValue) => Choice;

export type ChoiceCallback = (cb: CreateChoice) => Choice;


export type Choice<
  K extends string = string,
  V = unknown
> = { name: K; value: V };

export type ChoiceValue = ShapeCallback | Scalar | Dictionary | undefined;

/**
 * **AsChoice**
 * 
 * Converts a name/value pairing from createChoice() into a Choice.
 */
export type AsChoice<
  TName extends string = string, 
  TValue extends ChoiceValue = ChoiceValue
> = [TValue] extends [ShapeCallback]
? {name: TName; value: HandleDoneFn<ReturnType<TValue>>}
: [TValue] extends [Scalar | Dictionary]
  ? {name: TName; value: TValue }
  : {name: TName; value: TName};

type ProcessChoices<
  T extends string | [string, Scalar] | Choice | ChoiceCallback
> = T extends string
? Choice<T,T>
: T extends [string, Scalar]
? Choice<T[0],T[1]>
: T extends Choice
? T
: T extends ChoiceCallback
? ReturnType<ChoiceCallback>
: never;

export type ToChoices<
  T extends readonly (string | [string, Scalar] | Choice | ChoiceCallback)[]
> = {
  [K in keyof T]: ProcessChoices<T[K]>
}

export type ChoiceApiOptions = {
  /**
   * A choice may only be chosen once
   */
  unique: boolean;
  max: number | null;
  /**
   * the API style as it's presented after configuration
   */
  style: "fn" | "object";
}

export type ChoiceApi<
TChoices extends readonly Choice[],
  TOptions extends ChoiceApiOptions
> = {};


export type ChoiceApiConfig<
  TChoices extends readonly Choice[],
  TOptions extends ChoiceApiOptions
> = {
  done: () => ChoiceApi<TChoices, TOptions>;
  allowChoicesToBeUsedOnlyOnce: () => ChoiceApiConfig<
    TChoices,
    As<MergeObjects<TOptions, {unique: true}>, ChoiceApiOptions>
  >;
  /**
   * configured choices can be _reused_ multiple times
   */
  allowChoicesToBeUsedMultipleTimes: () => ChoiceApiConfig<
    TChoices,
    As<MergeObjects<TOptions, {unique: false}>, ChoiceApiOptions>
  >;
  setStyle: <TStyle extends "fn" | "object">(style: TStyle) => ChoiceApiConfig<
    TChoices,
    As<MergeObjects<TOptions, {style: TStyle}>, ChoiceApiOptions>
  >;
  /**
   * set a maximum number of choices that should be allowed
   */
  maximumChoices: <TMax extends number>(max: TMax) => ChoiceApiConfig<
    TChoices,
    As<MergeObjects<TOptions, {max: TMax}>, ChoiceApiOptions>
  >;
}



// /**
//  * **Choice**`<T>`
//  * 
//  * Type utility which receives one of many _choice representations_ 
//  * (from `ChoiceRepresentation`) and converts it into a simple key/value pair.
//  */
// export type Choice<
//   T extends ChoiceRepresentation = ChoiceRepresentation
// > = T extends {name: string; type: Fn} 
//   ? ReturnType<T["type"]> extends { done: Fn }
//       ? Record<
//           T["name"], 
//           ReturnType<ReturnType<T["type"]>["done"]>
//         >
//       : Record<T["name"], ReturnType<T["type"]>>
    
//   : T extends {name: string; value: unknown}
//     ? Record<T["name"], T["value"]>
//   : T extends string
//     ? Record<T,T>
//   : T extends [name: string, value: unknown]
//     ? If<
//         IsFunction<T[1]>, 
//         Record<T[0], ReturnType<AsFunction<T[1]>>>,
//         Record<T[0], T[1]>
//       >
//     : never;


// type ToLookup<
// TInput extends readonly (ChoiceRepresentation|AsChoice)[],
// TOutput extends {[key:string]: unknown} = NonNullable<unknown>
// > = [] extends TInput
// ? ExpandRecursively<TOutput>
// : ToLookup<
//     AfterFirst<TInput>,
//     First<TInput> extends ChoiceRepresentation
//       ? AsChoice<First<TInput>> & TOutput
//       : First<TInput> extends Record<string, unknown> 
//         ? First<TInput> & TOutput
//         : never
//   >

// /**
//  *  **Choices**`<TInput>`
//  * 
//  * Converts an tuple of `ChoiceRepresentation` elements into a lookup table
//  * of name/values.
//  */      
// export type AsChoices<
//   TInput extends readonly (ChoiceRepresentation|AsChoice)[] = readonly ChoiceRepresentation[],
// > = ToLookup<TInput>;

export type MultipleChoice<
  TChoices extends Dictionary<string> = Dictionary<string>,
  TForceUnique extends boolean = boolean,
  TState extends readonly unknown[] = [],
  TExclude extends string = never
> = {
  selected: TState;
  forceUnique: TForceUnique;
  choices: TChoices;
  <T extends string & Exclude<keyof TChoices, TExclude>>(s: T ): 
    MultipleChoice<
      TChoices,
      TForceUnique,
      [
        ...TState, 
        T extends keyof TChoices 
          ? TChoices[T] 
          : never
      ],
      AsString<If<
        IsTrue<TForceUnique>,
        TExclude | T, 
        TExclude
      >>
    >;
  /** return the selected choices */
  done: () => TState;
};

/**
 * **MultiChoiceCallback**`<TApi>`
 * 
 * Provides the typing so that you can easily incorporate a "choice"
 * as a parameter to your functions. 
 * 
 * It is intended to be used with the runtime utility `handleDoneFn()` 
 * so that if a user doesn't terminate their callback with a call to
 * `.done()` then this is done for them.
 */
export type MultiChoiceCallback<TApi extends MultipleChoice> = <
  CB extends ((c: TApi) => unknown)
>(cb: CB) =>  HandleDoneFn<ReturnType<CB>>; 


type MergeKVs<
  TInput extends readonly Dictionary[],
  TOutput extends Dictionary = EmptyObject
> = [] extends TInput
  ? ExpandRecursively<TOutput> 
: MergeKVs<
    AfterFirst<TInput>,
    First<TInput> extends keyof TOutput
    ? TOutput
    : TOutput & First<TInput>
  >;

/**
 * **ChoiceBuilder**
 * 
 * Builds a Choice API surface:
 */
export type ChoiceBuilder= <
  TChoices extends readonly Choice[]
>(...choices: TChoices) => ({
  chooseMany: <
    TForce extends boolean
  >(force: TForce) => 
  MultipleChoice<
     MergeKVs<TChoices> extends Dictionary<string>
     ? MergeKVs<TChoices>
     : never,
    TForce
  >;
});

