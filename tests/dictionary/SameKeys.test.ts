import { describe, it, expect } from "vitest";

import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import type { HasSameKeys } from "@inferred-types/types";

describe("SameKeys<T> utility", () => {


  it("happy path", () => {


    type cases = [
      ExpectFalse<HasSameKeys<{ id: "abc" },{ id: "abc"; favorite: false }>>,
      ExpectTrue<HasSameKeys<{ id: "abc" },{ id: "syz" }>>,

      ExpectFalse<HasSameKeys<[1,2],[1,2,3]>>,
      ExpectTrue<HasSameKeys<[1,2], [3,4]>>
    ];
    const cases: cases = [
      false, true,
      false, true,
    ];
    expect(cases).toBe(cases);
  });
});
