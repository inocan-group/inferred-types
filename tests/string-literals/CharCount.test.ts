import { Equal, Expect } from "@type-challenges/utils";
import { CharCount } from "inferred-types/types";
import { RetainChars } from "transpiled/types";
import { describe, it } from "vitest";

describe("CharCount<T,C>", () => {

  it("happy path", () => {
    type T1 = CharCount<"(a(b(c()))", "(">;

    type cases = [
      Expect<Test<T1, "equals",  4>>,
    ];
  });

  it("union character", () => {
    type T1 = CharCount<"(a(b(c()))", "(" | "[">;
    type T2 = CharCount<"(a(b(c([])))", "(" | "[">;

    type cases = [
        Expect<Test<T1, "equals",  4>>,
        Expect<Test<T2, "equals",  5>>,
    ];
  });


  it("wide types as input", () => {
    type T1 = CharCount<string, "(">;
    type T2 = CharCount<"abc", string>;

    type cases = [
        Expect<Test<T1, "equals",  number>>,
        Expect<Test<T2, "equals",  number>>,
    ];
  });


});
