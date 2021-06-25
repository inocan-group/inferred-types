import type { ExpandRecursively } from "~/types";

export interface IFluentConfigurator<C> {
  /**
   * **set**
   *
   * Sets a new key/value pair to the configurator.
   *
   * @param key the key to put this new configuration item
   * @param value the value of the configuration item
   */
  set<V, K extends string, KV = { [U in K]: V }>(key: K, value: V): IFluentConfigurator<C & KV>;
  done(): ExpandRecursively<C>;
}

/**
 * This function will return a basic _configurator_ API surface which allows
 * you to add name/value pairs to a growing dictionary of strongly typed data.
 *
 * When configuration is complete, you call the `done()` endpoint and the typed
 * configuration will be returned with the API removed.
 *
 * > **Note:** the approach taken here requires that you configure using a **fluent style**
 * exclusively. If you don't the non-fluent properties set will not show up
 * in the typing or the run-time object.
 */
export function FluentConfigurator<I>(initial: I = {} as I) {
  const api = <C>(current: C): IFluentConfigurator<C> => {
    return {
      set<V, K extends string, KV = { [U in K]: V }>(key: K, value: V) {
        const keyValue = ({ [key]: value as V } as unknown) as KV;
        const updated = { ...keyValue, ...current };

        return api<C & KV>(updated);
      },
      done() {
        return current as ExpandRecursively<C>;
      },
    };
  };

  if (initial && typeof initial !== "object") {
    throw new Error(
      "The FluentConfigurator was passed a non-object based value as the initial value. This is not allowed."
    );
  }

  return initial ? api(initial) : api({});
}
