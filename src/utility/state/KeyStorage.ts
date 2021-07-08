/* eslint-disable no-use-before-define */

export type KeyStorage<S extends readonly string[]> = (state: S) => {
  add: <N extends readonly string[]>(...store: N) => KeyStorageApi<readonly [...S, ...N]>;
  remove: <R extends string>(key: R) => KeyStorageApi<Exclude<S, R>>;
  done: () => S;
};

export type KeyStorageApi<S extends readonly string[]> = ReturnType<KeyStorage<S>>;

//TODO: need to make this work or remove

export function KeyStorage() {
  const api = <S extends readonly string[]>(state: S) => ({
    add: <N extends readonly string[]>(...store: N) => {
      return api<readonly [...S, ...N]>([...state, ...store]);
    },
    remove: <R extends string>(key: R) => api<Exclude<S, R>>(state.filter(i => i !== key) as unknown as Exclude<S, R>),
    done: () => state
  });

  return api([]);
}
