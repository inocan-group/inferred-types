import { describe, it } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";
import { RequiredKeysTuple } from "inferred-types/types";

describe("RequiredKeysTuple<T>", () => {

  it("happy path", () => {
    type T1 = RequiredKeysTuple<{foo: 1; bar: 2; baz: 3}>;
    type T2 = RequiredKeysTuple<{foo: 1; bar: 2; baz?: 3; }>;
    type None = RequiredKeysTuple<{foo?: 1; bar?: 2; baz?: 3; bax?: 4; bay?: 5}>;

    type cases = [
      Expect<Equal<T1, ["foo", "bar", "baz"]>>,
      Expect<Equal<T2, ["foo", "bar"]>>,
      Expect<Equal<None, []>>,
    ];
    const cases: cases = [ true, true, true ];
  });


})
