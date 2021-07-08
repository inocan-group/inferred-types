import type { DictArray, DictArrayFilterCallback } from "~/types";
import { Configurator, IConfigurator } from "~/utility/state";

export interface Array<T> {
  filter<U extends T>(pred: (a: T) => a is U): U[];
}

/**
 * Accepts a `DictArray` and a callback which receives each key
 * value pair.
 */
export function filterDictArray<
  T extends object,
  C extends DictArrayFilterCallback<keyof T, T, true | false>,
  >(dictArr: DictArray<T>, cb: C) {

  const state: IConfigurator = Configurator();

  const updated = dictArr.filter(i => {
    const [k, v] = i;
    const keep = cb(k, v);
    if (!keep) {
      state.set(k as string, true);
    }

    return keep;
  });

  // TODO: fix this so that typing is actualy working!
  type ExcludedKeys = "";
  return updated as unknown as DictArray<Omit<T, ExcludedKeys>>;
}

