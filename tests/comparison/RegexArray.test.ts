import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { RegexArray } from "inferred-types/types";

describe("RegexArray<T>", () => {

  it("happy path", () => {
    type T1 = RegexArray<`Name: {{string}}; Age: {{number}}`>;

    type cases = [
      Expect<Equal<T1, RegexArray<`Name: {{string}}; Age: {{number}}`>>>,
      Expect<Equal<T1["length"], 2>>,
      Expect<Equal<T1[1], string>>,
      Expect<Equal<T1[2], `${number}`>>,

    ];
  });

});
