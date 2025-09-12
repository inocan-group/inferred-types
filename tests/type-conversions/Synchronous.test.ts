
import { describe, it } from "vitest";
import type { Expect, Synchronous, Test } from "inferred-types/types";

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
        Expect<Test<Str, "equals",  string>>,
        Expect<Test<AStr, "equals",  string>>,
        Expect<Test<LStr, "equals",  string>>,
        Expect<Test<L2Str, "equals",  string>>,
        Expect<Test<PP, "equals",  string>>,
    ];
  });

});
