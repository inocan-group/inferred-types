/* eslint-disable no-use-before-define */

/**
 * **ToFluent**
 *
 * Converts the typing of a dictionary of functions into the same
 * function signatures but changes the return type to be the Fluent API.
 *
 * **Note:** this utility also allows a non-fluent API surface `X` to be included as
 * part of the API surface if this is desired.
 */
export type ToFluent<
  T extends { [key: string]: (...args: any[]) => any },
  X extends object = {}
> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ToFluent<T, X> & X;
} & X;

/**
 * A _pure_ Fluent API which promotes an API surface where _every_ API endpoint must be a function
 * which returns the same API surface.
 *
 * To provide value, this style of Fluent API will need to perform useful _side effects_ when functions
 * on the API surface are called as this structure does not provide any means to maintain an internal state
 * which can be returned later.
 *
 * **Note:** _if you prefer a Fluent API with means to _escape_ with an internally managed state then
 * you should prefer the use of the `FluentApi` type._
 */
export type PureFluentApi<
  TApi extends Record<string, (...args: any[]) => PureFluentApi<TApi, any>>,
  TExclude extends string = ""
> = { [P in keyof TApi]: (...args: Parameters<TApi[P]>) => PureFluentApi<Omit<TApi, TExclude>> };

/**
 * Represents a **Fluent API** which exposes a API as a dictionary of functions. These functions will:
 *
 * 1. mutate an internal state or cause useful side-effects
 * 2. return the same API surface
 *
 * While in the case where the Fluent API is used to cause useful side effects, you might only
 * need the Fluent API surface to achieve your objectives but if instead it is used to
 * build up a useful _internal state_, then we must allow for
 * If this were 100% pure, however, the internal state would be unreachable and this pattern would
 * not be very valuable. Therefore, a secondary API, is expressed which allows for non-fluent
 *
 * At some point the internal state will be configured "enough" and the API will be extended to allow
 * the extraction of this state. This functional goal is expressed with the following generics:
 *
 * - `TFluent` is the fluent API which exposes a dictionary of functions
 * - `TEscape` is a non-fluent API used to do whatever you like but often is the means to
 * pass out the interior state which has been configured by the fluent parts of the API
 * - `TExclude` represents part of the API which -- due to the internal state -- should be hidden
 */
// export type FluentApi<
//   TFluent extends {
//     [K in keyof TFluent]: (...args: Parameters<TFluent[K]>) => FluentApi<TFluent, TEscape>;
//   },
//   TEscape extends object = {},
//   TExclude extends string = ""
// > = Omit<TFluent & TEscape, TExclude>;
