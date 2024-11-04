import {
  Dictionary,
  EmptyObject,
  TypedFunction ,
  Values,
  Throw,
  AfterFirst,
  First,
  ExpandRecursively,
  TupleToUnion,
  Unset,
  PublicKeyOf,
  IfUnset,
  KeyOf,
  Fail,
  Extends,
  UpsertKeyValue,
  Tuple,
  ReduceValues,
  IsEscapeFunction,
  RemoveNever,
  If,
  WhenNever,
  HasEscapeFunction,
  ErrorCondition
} from "@inferred-types/types";

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


type _GetEscapeFunction<
  T extends readonly unknown[]
> = WhenNever<
  First<
    RemoveNever<{
      [K in keyof T]: If<
        IsEscapeFunction<T[K]>,
        T[K],
        never
      >
    }>
  >,
  Throw<"no-escape-function">
>;


/**
 * **GetEscapeFunction**`<T>`
 *
 * Gets an escape function from an `Api` and from a `Dictionary | TypeFunction`
 * if it exists. If it does not exist then returns an ErrorCondition.
 */
export type GetEscapeFunction<
  T extends Dictionary | TypedFunction | Api
> = T extends Api
  ? _GetEscapeFunction<Values<T["surface"]>>
  : _GetEscapeFunction<Values<T>>;

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
    <T extends FluentState<TState>>(state: T) => TypedFunction<TState>),
    TOnce extends boolean
  >(cb: TCb, useOnce?: TOnce) => void,
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
export type FluentApi<
  TSurface extends Dictionary | TypedFunction,
  TState,
  TFluentFns extends readonly FluentFn<TState, any, any>[]
> = <T extends FluentState<TState>>(state: T) => ExpandRecursively<
  TSurface & ExpandFluentFns<FluentState<TState>,TFluentFns>
>;

/**
 * **ApiState**
 *
 * For API's which manage state, the state should be a Dictionary
 * or Tuple in shape.
 */
export type ApiState = Dictionary | Tuple;

/**
 * **ApiConfig**`<TSurface,TState>`
 *
 * The configuration of your API provides opportunities to
 * show or mask various parts of your surface area based on
 * the current _state_ you are in.
 */
export type ApiConfig<
  TSurface extends ApiSurface<Api> = ApiSurface<Api>,
  TState extends ApiState = ApiState,
> = {
  callOnce: readonly string[],
  called: readonly string[],
  mask: ((state: TState, called: readonly string[]) => readonly (KeyOf<TSurface>)[])
};

// /**
//  * **ToFluent**`<TSurface,TState,TUseOnce>`
//  *
//  * Upgrades a base API to an API which supports state management
//  * and a Fluent API style.
//  */
// export type DefineFluentApi<
//   TSurface extends Dictionary | TypedFunction = EmptyObject,
//   TState extends readonly FluentFn<TState, any, any>[] = [],
//   TConfig extends ApiConfig = { callOnce: ["escapeFn"] }
// > = {
//   addFluentFn: <
//     TName extends string,
//     TFn extends <TCb extends (
//       <T extends FluentState<TState>>(state: T) => TypedFunction<TState>
//     )>(cb: TCb) => void,
//     TUse extends boolean = false
//   >(name: TName, fn: TFn, useOnce?: TUse) => DefineFluentApi<
//       TSurface,
//       TState,
//       [
//         ...TState,
//         FluentFn<TState,TName,TFn>
//       ]
//     >;
//   done: () => FluentApi<TSurface,TState,TState>;
// };

// export type AsFluentApi<
//   TSurface extends Dictionary | TypedFunction,
//   TState,
//   TFluentFns extends readonly [FluentFn<TState, any, any>, ...FluentFn<TState, any, any>[]]
// > = HasEscapeFunction<TSurface> extends true
// ? FluentApi<TSurface, TState, TFluentFns>
// : Throw<"no-escape-function">;


/**
 * **ApiOptions**`<[TSurface]>`
 *
 * The _options_ which go into defining an API surface.
 */
export type ApiOptions<
  TSurface extends Dictionary | TypedFunction | Unset = Unset
>  = {
  /**
   * any _state_ which the API is managing (making it a `FluentApi`)
   *
   * @default Unset;
   */
  state: Unset | Dictionary;

  /**
   * An array of _keys_ to the API surface which should only be allowed
   * to be called once (and will be _masked_ thereafter from runtime).
   *
   * **Note:** _this only really makes sense when you're managing state_.
   */
  callOnce: IfUnset<TSurface, readonly PropertyKey[], readonly PublicKeyOf<AsApi<TSurface>>[]>;

};



/**
 * **Api**
 *
 * An API definition typically created via `AsApi<TSurface,TOpts>` which is
 * not responsible for managing state.
 *
 * **Related:** `FluentApi`, `AsFluentApi`
 */
export type Api<
  TSurface extends Dictionary | TypedFunction = Dictionary | TypedFunction
> = {
  _kind: "api";
  surface: TSurface;
}

/**
 * **ApiReturn**
 *
 * The expected/desired types that could result from calling the API's
 * _endpoints_.
 *
 * Note: this does not consider the possibility of a user
 */
export type ApiReturn<
  T extends Api
> = "surface" extends keyof T
? T["surface"] extends Dictionary
  ? TupleToUnion<ReduceValues<T["surface"]>>
  : never
: unknown;


/**
 * **ApiSurface**`<T>`
 *
 * Extracts the API's surface area from an `Api`.
 */
export type ApiSurface<T extends Api> = T["surface"];

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
  TApi extends Api
> = <TCall extends (api: ApiSurface<TApi>) => unknown>(cb: TCall) => ReturnType<TCall>;




type _Fluent<
  _TStateDefn extends Dictionary,
  _TState extends _TStateDefn,
  _TConfig extends {
    called: readonly KeyOf<_TState>[];
    callOnce: readonly KeyOf<_TState>[];
  },
  _TCaller extends KeyOf<_TState>,
  _TUpdate extends _TStateDefn
>  = any;

/**
 * **Api**`<TSurface>`
 *
 * Validates a candidate for a _stateless_ API and returns it as an `Api<TSurface>`
 * if valid. If not valid you'll get a `ErrorCondition`.
 */
export type AsApi<
  TSurface extends Dictionary | TypedFunction
> = HasEscapeFunction<TSurface> extends true
  ? Api<TSurface>
  : Throw<"no-escape-function">;

export type ApiStateInitializer<
  TApi
> = <T extends Dictionary>(state: T) => TApi;

/**
 * A builder API for defining _stateless_ API's.
 *
 * Note: ironically this is **not** a stateless API.
 */
export type DefineStatelessApi<
  T extends Dictionary = EmptyObject,
  _C extends {
    called: readonly KeyOf<T>[];
    callOnce: ["escapeFunction"];
  } = { called: []; callOnce: ["escapeFunction"]}
> = ({
  escapeFunction: (state: T) => <
    TKey extends string,
    TFn extends () => unknown
  >(
    key: Fail<TKey, Extends<TKey,KeyOf<T>> >,
    fn: TFn
  ) => ReturnType<TFn>;
  addFn: (state: T) => <
    TKey extends string,
    TFn extends TypedFunction
  >(key: Fail<TKey, KeyOf<T>>, fn: TFn) =>
    ExpandRecursively<T["surface"] & Record<TKey, TFn>> extends T["surface"]
      ?  UpsertKeyValue<T, "surface",  ExpandRecursively<T["surface"] & Record<TKey, TFn>>>
      : never

});



/**
 * **ApiEscape**`<T>`
 *
 * Given a `T` which extends `Api` or `ApiCallback`, this utility will expose
 * the escape function.
 */
export type ApiEscape<
  T extends Dictionary | TypedFunction | ApiCallback<Api>
> = T extends ApiCallback<Api>
? T extends TypedFunction
  ? Parameters<T>[0] extends Dictionary | TypedFunction
    ? GetEscapeFunction<Parameters<T>[0]>
    : never
  : never
: GetEscapeFunction<T>;

// /**
//  * **HandleApiCallback**`<TReturn, TApi>`
//  *
//  * Given a returned value `TReturn` from the callback,
//  * it either proxies that value through if the user completed
//  * the API calling, or calls the _escape function_ if not.
//  */
// export type HandleApiCallback<
//   TReturn
// > = TReturn extends Dictionary | TypedFunction
// ? GetEscapeFunction<TReturn> extends TypedFunction
//   ? ReturnType<GetEscapeFunction<TReturn>>
//   : TReturn
// : TReturn;


/**
 * **ApiHandler**`<TApi,THandle>`
 *
 * An API handler for a specific API
 */
export type ApiHandler<
  TApi extends Api,
  _THandle extends (t: unknown, e: ErrorCondition) => unknown
> = (api: TApi) => <R>(result: R) => unknown;
