import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ExtendsEvery } from "inferred-types/types";

describe("ExtendsEvery<T,U>", () => {

  it("happy path", () => {
    type T1 = ExtendsEvery<[1, 2, 3], [number]>;
    type T2 = ExtendsEvery<[1, 2, 3], [number, string]>;
    type T3 = ExtendsEvery<[number, boolean, 1, 2, 3, true], [number, boolean]>;
    type T4 = ExtendsEvery<[1, true], [1, boolean]>;

    type F1 = ExtendsEvery<[1, 2, 3], [1, 4]>;
    type F2 = ExtendsEvery<["foo", string, "bar"], ["foo", "bar"]>
    type F3 = ExtendsEvery<[1, true, false], [number, string]>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });

});
