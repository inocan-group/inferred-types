/* eslint-disable no-use-before-define */
import { 
  KV, 
  If, 
  IsTrue, 
  Fn, 
  HandleDoneFn, 
  AfterFirst, 
  First,
  AsFunction,
  ExpandRecursively,
  ShapeCallback,
  IsFunction,
  AsString
} from "src/types/index";


/**
 * **ChoiceRepresentation**
 * 
 * Allows a "choice" to be represented in multiple ways. Intended to be
 * used with `Choice` and `Choices` type utils.
 */
export type ChoiceRepresentation<TName extends string = string, TValue = unknown> = 
| {name: TName; value: TValue}
| {name: TName; type: TValue & ShapeCallback }
| [name: TName, value: TValue ]
| TName;


/**
 * **Choice**`<T>`
 * 
 * Type utility which receives one of many _choice representations_ 
 * (from `ChoiceRepresentation`) and converts it into a simple key/value pair.
 */
export type Choice<
  T extends ChoiceRepresentation = ChoiceRepresentation
> = T extends {name: string; type: Fn} 
  ? ReturnType<T["type"]> extends { done: Fn }
      ? Record<
          T["name"], 
          ReturnType<ReturnType<T["type"]>["done"]>
        >
      : Record<T["name"], ReturnType<T["type"]>>
    
  : T extends {name: string; value: unknown}
    ? Record<T["name"], T["value"]>
  : T extends string
    ? Record<T,T>
  : T extends [name: string, value: unknown]
    ? If<
        IsFunction<T[1]>, 
        Record<T[0], ReturnType<AsFunction<T[1]>>>,
        Record<T[0], T[1]>
      >
    : never;


type ToLookup<
TInput extends readonly (ChoiceRepresentation|Choice)[],
TOutput extends {[key:string]: unknown} = NonNullable<unknown>
> = [] extends TInput
? ExpandRecursively<TOutput>
: ToLookup<
    AfterFirst<TInput>,
    First<TInput> extends ChoiceRepresentation
      ? Choice<First<TInput>> & TOutput
      : First<TInput> extends Record<string, unknown> 
        ? First<TInput> & TOutput
        : never
  >

/**
 *  **Choices**`<TInput>`
 * 
 * Converts an tuple of `ChoiceRepresentation` elements into a lookup table
 * of name/values.
 */      
export type AsChoices<
  TInput extends readonly (ChoiceRepresentation|Choice)[] = readonly ChoiceRepresentation[],
> = ToLookup<TInput>;

export type MultipleChoice<
  TChoices extends KV<string> = KV<string>,
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
  TInput extends readonly {[key: string]: unknown}[],
  TOutput extends {[key: string]: unknown} = NonNullable<unknown>
> = [] extends TInput
? TOutput extends Record<string, unknown>
  ? ExpandRecursively<TOutput> 
  : never
: MergeKVs<
    AfterFirst<TInput>,
    First<TInput> extends keyof TOutput
    ? TOutput
    : TOutput & First<TInput>
  >;

/**
 * **ChoiceBuilder**
 * 
 * Builds a _choice_ API surface (with a `done()` exit)
 */
export type ChoiceBuilder= <
  TChoices extends readonly KV<string>[]
>(...choices: TChoices) => ({
  chooseMany: <
    TForce extends boolean
  >(force: TForce) => 
  MultipleChoice<
     MergeKVs<TChoices> extends KV<string>
     ? MergeKVs<TChoices>
     : never,
    TForce
  >;
});

