import { Narrowable } from "~/types/Narrowable";


/**
 * **UniqueDictionary**
 * 
 * A dictionary converted by `arrayToObject()` which expects each key `S` to have a only a
 * single/unique value.
 */
export type UniqueDictionary<S extends PropertyKey, N extends Narrowable, T extends Record<keyof T, N> & Record<S, any>> = { [V in T as V[S]]: V };

/**
 * **GeneralDictionary**
 * 
 * A dictionary converted by `arrayToObject()` which expects each key `S` to have an
 * array of values.
 */
export type GeneralDictionary<S extends PropertyKey, N extends Narrowable, T extends Record<keyof T, N> & Record<S, any>> = { [V in T as V[S]]: V[] };


export type ArrayConverter<S extends PropertyKey, U extends boolean> =
  /**
   * An `ArrayConverter` is the partial application of the `arrayToObject()`
   * utility. At this point, the configuration is setup already and all that's
   * left is to pass in an array of objects.
   */
  <N extends Narrowable, T extends Record<keyof T, N> & Record<S, any>>(
    arr: readonly T[]
  ) => true extends U ? UniqueDictionary<S, N, T> : GeneralDictionary<S, N, T>;


/**
 * Converts an array of objects into a dictionary by picking a property name contained
 * by all objects and using that as the key to the dictionary.
 * 
 * ```ts
 * const arr = [ 
 *   { kind: "color", favorite: "blue", likes: 100 },
 *   { kind: "song", favorite: "some song", likes: 25 }
 * ];
 * const dict = arrayToObject("kind")(arr);
 * ```
 * 
 * This will produce a dictionary with keys of `color` and `song`.
 */
export function arrayToObject<
  S extends PropertyKey,
  U extends boolean
>(prop: S, unique?: U) {
  type X = true extends U ? true : false;
  /**
   * **arrayToObject** - partially applied
   * 
   * pass in an array of objects to complete application of arrayToObject()
   */
  const transform: ArrayConverter<S, X> = <N extends Narrowable, T extends Record<keyof T, N> & Record<S, any>>(
    arr: readonly T[]
  ): true extends X ? UniqueDictionary<S, N, T> : GeneralDictionary<S, N, T> => {

    const result = unique !== false
      ? arr.reduce(
        (acc, v) => ({ ...acc, [v[prop]]: v }), {} as UniqueDictionary<S, N, T>
      )
      : arr.reduce(
        (acc, v) => {
          const existing = acc[v[prop] as T[S]] || [];
          return { ...acc, [v[prop]]: [...existing, v] };
        }, {} as GeneralDictionary<S, N, T>
      );

    // type cast based on `U`
    return result as true extends X ? UniqueDictionary<S, N, T> : GeneralDictionary<S, N, T>;
  };

  return transform;
  // return converter(prop, unique);
}

