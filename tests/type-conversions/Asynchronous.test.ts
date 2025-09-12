
import { describe, it } from "vitest";
import type { Asynchronous, Expect, Test } from "inferred-types/types";

describe("Asynchronous<T>", () => {

    it("happy path", () => {
        type Str = Asynchronous<string>;
        type AStr = Asynchronous<Promise<string>>;
        type Like = {
            then(): string;
        }

        type LStr = Asynchronous<Like>;
        type PP = Asynchronous<Promise<string>>;

        type cases = [
            Expect<Test<Str, "equals", Promise<string>>>,
            Expect<Test<AStr, "equals", Promise<string>>>,
            Expect<Test<LStr, "equals", LStr>>,
            Expect<Test<PP, "equals", Promise<string>>>,
        ];
    });

});
