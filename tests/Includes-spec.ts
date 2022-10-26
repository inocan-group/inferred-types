import { describe, it, expect } from "vitest";

import type { Includes } from "../src/types";
import type { Equal, Expect } from "@type-challenges/utils";

describe("Includes type check", () => {
  it("Includes works on a string source", () => {
    type T = Includes<"Hello World", "Hello">;
    type F = Includes<"Hello World", "nada">;
    type U = Includes<string, "who cares">;
    type N = Includes<"Hello World", string>;
    type cases = [
      Expect<Equal<T, true>>, //
      Expect<Equal<F, false>>,
      Expect<Equal<U, boolean>>,
      Expect<Equal<N, boolean>>
    ];
    const typeTests: cases = [true, true, true, true];
    expect(typeTests).toBe(typeTests);
  });

  it("Includes works on a string[] source", () => {
    type T = Includes<["Hello", "World"], "Hello">;
    type F = Includes<["Hello", "World"], "nada">;
    type U = Includes<string[], "who cares">;
    type N = Includes<["Hello", "World"], string>;
    type cases = [
      Expect<Equal<T, true>>, //
      Expect<Equal<F, false>>,
      Expect<Equal<U, boolean>>,
      Expect<Equal<N, boolean>>
    ];
    const typeTests: cases = [true, true, true, true];
    expect(typeTests).toBe(typeTests);
  });
});
