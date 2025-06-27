import { Expect, Test, ToJsonArray } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ToJsonArray()", () => {

  it("scalar values", () => {
    type T = ToJsonArray<[1,2,"foo", null]>;

    type cases = [
      Expect<Test<T, "equals", `[ 1, 2, "foo", null ]`>>
    ];
  });

  it("two dimensional array", () => {
    type T = ToJsonArray<[[1,1], ["2","2"]]>;

    type cases = [
      Expect<Test<T, "equals", `[ [ 1, 1 ], [ "2", "2" ] ]`>>
    ];
  });

  it("with objects", () => {
    type T = ToJsonArray<[  {id: "foo"}, { id: "bar"}]>;

    type cases = [
      Expect<Test<T, "equals", `[ { "id": "foo" }, { "id": "bar" } ]`>>
    ];
  });

  it("empty", () => {
    type T = ToJsonArray<[]>;

    type cases = [
      Expect<Test<T, "equals", `[  ]`>>
    ];
  });
});
