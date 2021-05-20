/**
 * A `BuilderCommand` is a part of the API exposed by a `BuilderApi`.
 * It's only requirements is that it returns back the full command
 * interface that the `BuilderApi` exposes.
 */
export type BuilderCommand<I extends any[], O> = (args: I) => O;

/**
 * The `BuilderCommandImpl` is a higher order function which returns a `BuilderCommand`.
 *
 * It is used so that command implementations can be built independent of the state being
 * managed by the overall Builder. This allows for things such as:
 *
 * ```ts
 * const addParam: BuilderCommandImpl
 *
 * ```
 */
export type BuilderCommandImpl<I extends any[], C extends any[], O> = (
  args: I
) => BuilderCommand<C, O>;

/**
 * A Builder API is a _fluent_ style API which builds up an understanding of **state**
 * through the use of it's API. When "completed", a Builder API will stop expressing it's
 * API and switch over to the configuration object which the API was intended for.
 *
 * Optionally the
 */
export interface BuilderApi<I, O, C, E> {
  (configurator: I): BuilderApi<I, O, C, E>;
}

const addParam = (params) => {
  return (param: string, value: string) => {
    params[param] = value;
  };
};

type IExampleState = { foo: number; bar: string; baz?: string };

const myBuilder = () => {
  const state: Partial<IExampleState> = {};
  return {
    ...addParam(state),
  };
};

const foo = myBuilder().addParam();
