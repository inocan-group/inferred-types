import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { Pop, Test } from "inferred-types/types";

describe("ExcludeLast<T>", () => {

    it("happy path", () => {
        type T1 = Pop<[1, 2, 3]>;
        type JustOne = Pop<[1]>;
        type None = Pop<[]>;

        type cases = [
            Expect<Test<T1, "equals", [1,  2]>>,
            Expect<Test<JustOne, "equals",  []>>,
            Expect<Test<None, "equals", []>>
        ];
    });

});
