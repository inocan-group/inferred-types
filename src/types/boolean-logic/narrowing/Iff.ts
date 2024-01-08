import { Constant } from "src/constants";
import { 
  AfterFirst, 
  AsArray, 
  ErrorCondition, 
  First, 
  IfEqual, 
  IfExtends, 
  IfNotError, 
  IfTruthy,  
  IsEqual,   
  MergeObjects,   
  Something,  
  Tuple 
} from "src/types/index";

export type Iff__FindSet = "truthy" | "container" | "object" | "array" | "non-empty-object" | "non-error" | "non-empty-array" | "something" | readonly unknown[];
/**
 * options that can be set when using the `Iff` type utility
 */
export interface IffOptions<
  TFindSet extends Iff__FindSet = Iff__FindSet,
  TElse = unknown
> {
  find?: TFindSet;
  else?: TElse;
}

type IsBespokeSet<T extends IffOptions> = T["find"] extends readonly unknown[] ? true : false;

type ElseValue<T extends IffOptions, TMsg extends string> = IfEqual<
  T["else"], Constant<"NoElse">,
  ErrorCondition<"nothing-found", TMsg>
>;

type BespokeProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = never;

type ContainerProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = never;

type ObjectProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = never;

type ArrayProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = never;

type NonEmptyObjectProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = never;

type NonEmptyArrayProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = [] extends TEval
? ElseValue<TOptions, "no non-empty array value found!">
: IfNotError<
    First<TEval>,{ neverAsError: true},
    First<TEval>,
    NonErrorProcess<AfterFirst<TEval>, TOptions>
  >;;

type NonErrorProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = [] extends TEval
? ElseValue<TOptions, "no non-error value found!">
: IfNotError<
    First<TEval>,{ neverAsError: true},
    First<TEval>,
    NonErrorProcess<AfterFirst<TEval>, TOptions>
  >;

type TruthyProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = [] extends TEval
? ElseValue<TOptions, "no truthy value found!">
: IfTruthy<
    First<TEval>,
    First<TEval>,
    TruthyProcess<AfterFirst<TEval>, TOptions>
  >;

type SomethingProcess<
  TEval extends Tuple,
  TOptions extends IffOptions
> = [] extends TEval
? ElseValue<TOptions, "no truthy value found!">
: IfExtends<
    First<TEval>, Something,
    First<TEval>,
    TruthyProcess<AfterFirst<TEval>, TOptions>
  >;

type DefaultOptions = { find: "something"; else: Constant<"NoElse"> };

type Process<
  TEval extends Tuple,
  TOptions extends IffOptions<Iff__FindSet, unknown> = DefaultOptions
> = IsBespokeSet<TOptions> extends true
? BespokeProcess<TEval,TOptions>
: IsEqual<TOptions["find"], "truthy"> extends true
? TruthyProcess<TEval,TOptions>
: IsEqual<TOptions["find"], "container"> extends true
? ContainerProcess<TEval,TOptions>
: IsEqual<TOptions["find"], "object"> extends true
? ObjectProcess<TEval,TOptions>
: IsEqual<TOptions["find"], "array"> extends true
? ArrayProcess<TEval,TOptions>
: IsEqual<TOptions["find"], "non-empty-object"> extends true
? NonEmptyObjectProcess<TEval,TOptions>
: IsEqual<TOptions["find"], "non-empty-array"> extends true
? NonEmptyArrayProcess<TEval,TOptions>
: IsEqual<TOptions["find"], "non-error"> extends true
? NonErrorProcess<TEval,TOptions>
: IsEqual<TOptions["find"], "something"> extends true
? SomethingProcess<TEval,TOptions>
: never;


/**
 * **Iff**`<TEval, [IffOptions]>`
 * 
 * Your input for `TEval` is either:
 *  1. **Tuple / Array**:
 *    in this case it will traverse the tuple until it finds the first element which
 *    meets the set's requirements. Assuming it finds an element it will return just
 *    that element.
 *  2. **Any other value**:
 *    In this case it will test if the singular type passed meets the set's requirements
 *    and proxy it along if it does.
 * 
 * By default this utility will look for a `Something` value (aka, not `null` or `undefined`)
 * but you can customize it to be what you like within the options.
 * 
 * ### Options:
 * 
 * - `find` - lets you choose from a variety of "named options" which should be clear
 * in what they are looking for. Alternatively, you can add a Tuple of types and in
 * this case a successful hit will be when any one of the types provided is _extended_
 * by the value.
 * - `else` - by default, if "find set" is not found then it will return an error of 
 * the type `ErrorCondition<"nothing-found">` and while this may be adequate for some
 * situations you can change it to whatever you like.
 */
export type Iff<
  TEval,
  TOptions extends IffOptions<Iff__FindSet,unknown> = DefaultOptions
> = Process<
  AsArray<TEval>, 
  // TOptions
  MergeObjects<DefaultOptions,TOptions>
>;
