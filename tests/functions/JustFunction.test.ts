import { Equal, Expect } from "@type-challenges/utils";
import { JustFunction } from "inferred-types/types";
import { describe, it } from "vitest";

describe("JustFunction<T>", () => {

  it("happy path", () => {
    type F1 = JustFunction<() => "hi">;
    type F2 = JustFunction<(() => "hi") & { foo: 1 }>;
    type F3 = JustFunction<((name: string) => `hi ${string}`) & {name: "greet"}>;


    type cases = [
        Expect<Test<F1, "equals",  () => "hi">>,
        Expect<Test<F2, "equals",  () => "hi">>,
        Expect<Test<F3, "equals",  (nam: string) => `hi ${string}`>>,
    ];
  });

});
