import { } from "@type-challenges/utils";
import { keysOf } from "inferred-types/runtime";
import { Narrowable, Sort, SortApi } from "inferred-types/types";
import { NarrowObject } from "transpiled/types";
import { describe, it } from "vitest";

describe("Sort<T>", () => {

  it("first test", () => {
    type Obj = {
      foo: "foo";
      bar: "bar";
      id: 1;
      baz: "baz";
    }

    const sort = <T extends NarrowObject<N>, N extends Narrowable>(obj: T): SortApi<T> => ({
      state: obj,
      toTop(...keys) {

      },
      toBottom(...keys) {

      },
      done() {
        return obj
      }
    });

    const sorted = () => sort({} as Obj).toTop("id", "foo");
    const s2 = sorted().done();

    type Sorted = Sort<Obj, typeof sorted>;

    type cases = [
      /** type tests */
    ];
  });

});
