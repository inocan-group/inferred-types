import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { HasEvery } from "inferred-types/types";
import { describe, it } from "vitest";

describe("HasEvery<T,U>", () => {

  it("happy path", () => {
    type T1 = HasEvery<[1, 2, 3], [1, 2]>;
    type T2 = HasEvery<[1, 2, 3], [1, 3]>;
    type T3 = HasEvery<[number, boolean, 1, 2, 3], [1, boolean]>;

    type F1 = HasEvery<[1, 2, 3], [1, 4]>;
    type F2 = HasEvery<[1, true], [1, boolean]>;
    type F3 = HasEvery<[1, true, false], [1, boolean]>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });

});
