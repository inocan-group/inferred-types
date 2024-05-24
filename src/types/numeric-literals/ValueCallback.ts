/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import { 
  Dictionary, 
  EmptyObject, 
  TypedFunction ,
  Contains,
  IsNever,
  Values,
  Throw,
  AfterFirst, 
  First,
  FindExtends,
  ExpandRecursively,
  ShapeCallback,
  Scalar,
  TypeDefinition,
  TupleToUnion,
  FromDefn,
} from "src/types/index";



/**
 * **ValueCallback**`<TVal, TReturn>`
 * 
 * A type utility to build a simple "value callback".
 * 
 * ```ts
 * // <V extends string>(v: V) => `hi ${string}`;
 * type T = ValueCallback<string, `hi ${string}`>;
 * ```
 */
export type ValueCallback<
  TVal, 
  TReturn
> = <V extends TVal>(v: V) => TReturn;

export type EscapeFunction<
  T extends () => any = () => any
> = T & { escape: true }

/**
 * **HasEscapeFunction**`<T>`
 * 
 * Checks whether the API surface passed in has an escape function defined.
 */
export type HasEscapeFunction<
  T extends Dictionary | TypedFunction
> = T extends Dictionary
? Contains<Values<T>, EscapeFunction>
: T extends TypedFunction
  ? T extends EscapeFunction
    ? true
    : false
  : false;

export type GetEscapeFunction<
  T extends Dictionary | TypedFunction
> = T extends Dictionary
? FindExtends<Values<T>, EscapeFunction> extends TypedFunction
  ? FindExtends<Values<T>, EscapeFunction>
  : never
: T extends TypedFunction
  ? T extends EscapeFunction
    ? T
    : never
  : never;

export type FluentState<T> = {
  state: T;
  config: {
    useOnce: keyof T[];
    used: keyof T[];
  };
}

export type FluentFn<
  TState,
  TName extends string,
  TFn extends <TCb extends (
    <T extends FluentState<TState>>(state: T) => TypedFunction<TState>
  )>(cb: TCb, useOnce?: TOnce) => void,
  TOnce extends boolean = false
> = {
  name: TName;
  fn: TFn;
  useOnce: TOnce;
}


type ExpandFluentFns<
  TFluentState extends FluentState<any>,
  TFns extends readonly FluentFn<TFluentState["state"], any, any>[],
  TFluentApi extends Dictionary = EmptyObject
> = [] extends TFns
? TFluentApi
: ExpandFluentFns<
    TFluentState,
    AfterFirst<TFns>,
    TFluentApi & Record<
      First<TFns>["name"],
      First<TFns>["fn"]
    >
  >;


/**
 * **FluentApi**`<TSurface,TState,TFluentFns>`
 * 
 * Defines the callback loop necessary to manage state via a
 * Fluent API.
 */
type FluentApi<
  TSurface extends Dictionary | TypedFunction,
  TState,
  TFluentFns extends readonly FluentFn<TState, any, any>[]
> = <T extends FluentState<TState>>(state: T) => ExpandRecursively<
  TSurface & ExpandFluentFns<FluentState<TState>,TFluentFns>
>;

/**
 * **ToFluent**`<TSurface,TState,TUseOnce>`
 * 
 * Upgrades a base API to an API which supports state management
 * and a Fluent API style.
 */
export type ToFluent<
  TSurface extends Dictionary | TypedFunction,
  TState,
  TFluentFns extends readonly FluentFn<TState, any, any>[] = []
> = {
  addFluentFn: <
    TName extends string,
    TFn extends <TCb extends (
      <T extends FluentState<TState>>(state: T) => TypedFunction<TState>
    )>(cb: TCb) => void,
    TUse extends boolean = false
  >(name: TName, fn: TFn, useOnce?: TUse) => ToFluent<
      TSurface,
      TState,
      [
        ...TFluentFns,
        FluentFn<TState,TName,TFn>
      ]
    >;
  done: () => FluentApi<TSurface,TState,TFluentFns>;
};


export type Api<
  TSurface extends Dictionary | TypedFunction,
  TState = never,
> = HasEscapeFunction<TSurface> extends true
  ? IsNever<TState> extends true
    ? TSurface
    : ToFluent<TSurface,TState>
  : Throw<"no-escape-function">;

export type ApiCallbackOptions<
  TProxy extends readonly (Scalar | ShapeCallback)[] =  readonly (Scalar | ShapeCallback)[]
> = {
  /**
   * Allow types _other_ than the callback API to be passed into this
   * function and have them proxied through.
   */
  proxy?:  TProxy;


}

/**
 * **ApiCallback**`<TSurface,[TOpts]>`
 * 
 * Defines a callback function which receives an API Surface (`TSurface`).
 * It is required that one of the properties on this surface be designated
 * as an `EscapeFunction` and if that is not done this utility will produce
 * an `ErrorCondition<"no-escape-function">`.
 * 
 * 
 * **Related:** `HandleApiCallback`, `ApiCallbackInfo`
 */
export type ApiCallback<
  TSurface extends Dictionary | TypedFunction,
  TOpts extends ApiCallbackOptions = ApiCallbackOptions
> = HasEscapeFunction<TSurface> extends true
? <
    TCall extends ((api: ExpandRecursively<TSurface>) => unknown) | (
      TOpts["proxy"] extends readonly unknown[] 
        ? TupleToUnion<TOpts["proxy"]> 
        : never
      ),
  >(
    cb: TCall
  ) =>  HandleApiCallback<TCall extends TypedFunction 
          ? ReturnType<TCall> 
          : TCall
        >
: Throw<"no-escape-function">;


/**
 * **ApiEscape**`<T>`
 * 
 * Given a `T` which extends `Api` or `ApiCallback`, this utility will expose
 * the escape function.
 */
export type ApiEscape<
  T extends Dictionary | TypedFunction | ApiCallback<Dictionary | TypedFunction>
> = T extends ApiCallback< Dictionary | TypedFunction>
? T extends TypedFunction
  ? Parameters<T>[0] extends Dictionary | TypedFunction
    ? GetEscapeFunction<Parameters<T>[0]>
    : never
  : never
: GetEscapeFunction<T>;

/**
 * **ApiReturn**`<T>`
 * 
 * Given a `T` which extends `ApiCallback`, this utility will expose
 * the _default_ return value provided by the _escape function_.
 */
export type ApiReturn<
T extends Dictionary | TypedFunction
> = ApiEscape<T> extends TypedFunction
? ReturnType<ApiEscape<T>>
: Throw<"no-escape-function">;


/**
 * **HandleApiCallback**`<TReturn, TApi>`
 * 
 * Given a returned value `TReturn` from the callback, 
 * it either proxies that value through if the user completed
 * the API calling, or calls the _escape function_ if not.
 */
export type HandleApiCallback<
  TReturn
> = TReturn extends Dictionary | TypedFunction
? GetEscapeFunction<TReturn> extends TypedFunction
  ? ReturnType<GetEscapeFunction<TReturn>>
  : TReturn
: TReturn;
