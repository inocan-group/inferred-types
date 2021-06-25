
import { DictArray } from "~/types";
import type { RuntimeProp, RuntimeType } from "~/types/runtime";
import { kv } from "~/utility";

export const propsApi = <S extends DictArray<RuntimeProp<string, RuntimeType<any>>>>(start: S) => {

  return {
    add: <P extends string, D extends RuntimeProp<P, any>>(prop: P, defn: D) => {
      const newEntry: DictArray<D> = [prop, kv(prop, defn)];
      return propsApi([...start, ...newEntry]);
    }
  };
};