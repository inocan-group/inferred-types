import { Equal, Expect } from "@type-challenges/utils";
import { CharCount } from "inferred-types/types";
import { RetainChars } from "transpiled/types";
import { describe, it } from "vitest";

describe("CharCount<T,C>", () => {

  it("happy path", () => {
    type T1 = CharCount<"(a(b(c()))", "(">;

    type cases = [
      Expect<Equal<T1, 4>>,
    ];
  });

  it("union character", () => {
    type T1 = CharCount<"(a(b(c()))", "(" | "[">;
    type T2 = CharCount<"(a(b(c([])))", "(" | "[">;

    type cases = [
        Expect<Equal<T1, 4>>,
        Expect<Equal<T2, 5>>,
    ];
  });


  it("wide types as input", () => {
    type T1 = CharCount<string, "(">;
    type T2 = CharCount<"abc", string>;

    type cases = [
        Expect<Equal<T1, number>>,
        Expect<Equal<T2, number>>,
    ];
  });


});
