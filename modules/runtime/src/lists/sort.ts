import type { Narrowable, NarrowObject, SortApi } from "inferred-types/types";
import { withKeys, withoutKeys } from "inferred-types/runtime";

function sortApi<
  T extends NarrowObject<N>,
  N extends Narrowable,
>(state: T): SortApi<T> {
  return {
    state,
    toTop(...selected) {
      return (
        sortApi({
          ...withKeys(state, selected),
          ...withoutKeys(state, selected),
        }) as ReturnType<SortApi<T>["toTop"]>
      );
    },
    toBottom(...selected) {
      return (
        sortApi({
          ...withoutKeys(state, selected),
          ...withKeys(state, selected),
        }) as ReturnType<SortApi<T>["toBottom"]>
      );
    },
    done() {
      return state;
    },
  };
}

export function sort<
  T extends readonly N[] | NarrowObject<N>,
  N extends Narrowable,
>(
  container: T,
  sort: <S extends SortApi<T>>(cb: S) => void,
) {

}
