import { Equal, Expect } from "@type-challenges/utils";
import { Synchronous } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Synchronous<T>", () => {

  it("happy path", () => {
    type Str = Synchronous<string>;
    type AStr = Synchronous<Promise<string>>;
    type LStr = Synchronous<{
        then(): string;
        finally(): void;
    }>;
    type L2Str = Synchronous<{
        then(): string;
    }>;
    type PP = Synchronous<Promise<string>>;

    type cases = [
        Expect<Equal<Str, string>>,
        Expect<Equal<AStr, string>>,
        Expect<Equal<LStr, string>>,
        Expect<Equal<L2Str, string>>,
        Expect<Equal<PP, string>>,
    ];
  });

});
