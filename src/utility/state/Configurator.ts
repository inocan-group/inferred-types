/* eslint-disable unicorn/consistent-function-scoping */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
function omit<T extends {}, K extends Array<keyof T>>(obj: T, ...removals: K) {
  const untyped = removals as Array<unknown>;
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !untyped.includes(key))) as Omit<
    T,
    K[number]
  >;
}

import { ExpandRecursively } from "~/types";
export interface IConfigurator<C = {}> {
  set<V, K extends string, KV = { [U in K]: V }>(
    key: K,
    value: V
  ): asserts this is IConfigurator<ExpandRecursively<C & KV>>;
  remove<K extends string & keyof C>(
    key: K
  ): asserts this is IConfigurator<ExpandRecursively<Omit<C, K>>>;
  done(): C;
}

/**
 * **Configurator**
 *
 * This function provides a configurator which uses TypeScript assertions
 * to narrow the scope of variables. Using type assertions though means we
 * can't also return values and therefore a _fluent_ API style is not possible.
 *
 * Note: this approach does require, that you explicitly use the `IConfigurator`
 * interface exported by this library. Without it you'd getting annoying TS errors
 * on every call to `set()` but adding it is simple enough:
 *
 * ```ts
 * import { Configurator, IConfigurator } from "inferred-types";
 * const config: IConfigurator = Configurator();
 * ```
 *
 * If you want to specify some guideline params which you expect to be set, you
 * can add them like so:
 *
 * ```ts
 * export type IExpected = { foo: number, bar: string };
 * const config: IConfigurator<IExpected> = Configurator<IExpected>();
 * ```
 *
 * This configuration will ensure that `foo` and `bar` will be seen as optional
 * parameters. If you set them they will stop being optional.
 */
export function Configurator() {
  let configuration = () => ({});

  const api = <C extends {}>(): IConfigurator<C> => {
    return {
      set<V, K extends string, KV = { [U in K]: V }>(key: K, value: V) {
        const keyValue = { [key]: value as V } as unknown as KV;
        const config = configuration() as C;
        const updated = { ...config, ...keyValue };

        configuration = (): C & KV => updated;
        return updated;
      },
      remove<K extends string & keyof C>(key: K) {
        const config = configuration() as C;
        const updated = omit(config, key) as ExpandRecursively<Omit<C, K>>;
        configuration = (): ExpandRecursively<Omit<C, K>> => updated;
        return updated;
      },
      done() {
        return configuration() as C;
      },
    };
  };

  return api();
}
