import { Equal, Expect } from "@type-challenges/utils";
import { JustFunction } from "inferred-types/types";
import { describe, it } from "vitest";

describe("JustFunction<T>", () => {

  it("happy path", () => {
    type F1 = JustFunction<() => "hi">;
    type F2 = JustFunction<(() => "hi") & { foo: 1 }>;
    type F3 = JustFunction<((name: string) => `hi ${string}`) & {name: "greet"}>;


    type cases = [
        Expect<Equal<F1, () => "hi">>,
        Expect<Equal<F2, () => "hi">>,
        Expect<Equal<F3, (nam: string) => `hi ${string}`>>,
    ];
  });

});
