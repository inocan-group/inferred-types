import { describe, it } from "vitest";
import { Expect, AllCaps, Test } from "inferred-types/types";

describe("AllCaps<T>", () => {

    it("happy path", () => {
        type HelloWorld = AllCaps<"hello world">;
        type MixedCase = AllCaps<"HEllo wORLd">;

        type cases = [
            Expect<Test<HelloWorld, "equals",  "HELLO WORLD">>,
            Expect<Test<MixedCase, "equals",  "HELLO WORLD">>
        ];
    });

});
