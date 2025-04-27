import { Equal, Expect } from "@type-challenges/utils";
import { ToJsonArray } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ToJsonArray()", () => {

  it("scalar values", () => {
    type T = ToJsonArray<[1,2,"foo", null]>;

    type cases = [
      Expect<Test<T, `[ 1, 2, "foo", "equals",  null ]`>>
    ];
  });

  it("two dimensional array", () => {
    type T = ToJsonArray<[[1,1], ["2","2"]]>;

    type cases = [
      Expect<Test<T, `[ [ 1, 1 ], [ "2", "equals",  "2" ] ]`>>
    ];
  });

  it("with objects", () => {
    type T = ToJsonArray<[  {id: "foo"}, { id: "bar"}]>;

    type cases = [
      Expect<Test<T, `[ { "id": "foo" }, "equals",  { "id": "bar" } ]`>>
    ];
  });

  it("empty", () => {
    type T = ToJsonArray<[]>;

    type cases = [
      Expect<Test<T, "equals",  `[  ]`>>
    ];
  });
});
