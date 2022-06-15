/* eslint-disable unicorn/consistent-function-scoping */

import { ExpandRecursively, FinalReturn, UnwrapValue } from "~/types";

export interface FluentStateOptions {
  /** when this endpoint is called, remove it from API surface afterward */
  useOnce?: boolean;
  /** when this endpoint is called, exclude other endpoints */
  exclude?: readonly string[];
  /** when this endpoint is called, include other endpoints which may have been excluded */
  include?: readonly string[];
}

export type CleanupApi<T extends Record<string, any>> = ExpandRecursively<T>;

export type FluentApi<TState extends {}, TApi extends {}> = (api: UnwrapValue<TApi>) 
  => undefined extends FinalReturn<TApi>
    ? FluentApi<TState, UnwrapValue<TApi>>
    : FinalReturn<TApi>;

export type FluentApiDefined<TState extends {}, TApi extends {}> = { 
  state: TState;
  api: CleanupApi<TApi>;
};

export type AnyFunction = (...args: any[]) => any;

export type FluentEndpoint<TState, TArgs extends any[]> = (state: TState) => (...args: TArgs) => void;
export type EscapeEndpoint<TState, TArgs extends any[]> = (state: TState) => (...args: TArgs) => any;

/**
 * The _shape_ of the state being managed has been established; 
 * the next step is to define the Fluent API surface.
 */
export type FluentStateWithShape<TState extends {}, TApi extends Record<string, AnyFunction>> = {
  /** a Fluent endpoint is typically a means to mutate the internally managed state */
  addFluentEndpoint: <
    N extends string, 
    F extends FluentEndpoint<TState, any>,
    O extends FluentStateOptions
  >(name: N, fn: F, options: O) => FluentStateWithShape<TState, TApi & Record<N, F>>;
  addEscapeEndpoint: <
    N extends string, 
    F extends EscapeEndpoint<TState, any>
  >(name: N, fn: F) => FluentStateWithShape<TState, TApi & Record<N, F>>;
  /** 
   * When you're happy with the API surface, call this function to move onto
   * to expose your API.
   */
  apiSurfaceComplete: () => FluentApiDefined<TState, TApi>;
};

export type FluentStateUtility = <TState extends {}>(state: TState) => FluentStateWithShape<TState, {}>;


export const createFluentConfigurator: FluentStateUtility = <TState extends {}>(state: TState) => {

  const config = <
    TApi extends Record<string, AnyFunction>
  >(api: TApi): FluentStateWithShape<TState, TApi> => ({
    addFluentEndpoint: <N extends string, F extends AnyFunction>(name: N, fn: F, _o: FluentStateOptions = {}) => {
      api = {...api, [name]: fn };
      return config(api as TApi & Record<N, F>);
    },
    addEscapeEndpoint: <N extends string, F extends (state: TState) => AnyFunction>(name: N, fn: F) => {
      api = {...api, [name]: fn };
      return config(api as TApi & Record<N, F>);
    },
    apiSurfaceComplete: () => {
      return { state, api } as FluentApiDefined<TState, TApi>;
    }
  });

  // kick off the configuration of API surface
  config({});
};
  
const state = {} as {foo?: string; bar?: string};
const f = createFluentConfigurator(state)
  .addFluentEndpoint("setFoo", (state) => (foo: string) => {
    state.foo = foo;
  }, {})
  .addEscapeEndpoint("escape", () => () => "i am outta here")
  .apiSurfaceComplete();
type _F = typeof f["api"];
console.log(f);
