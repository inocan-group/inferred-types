import { describe, it } from "vitest";
import { Expect, Test, TrimEach } from "inferred-types/types";

describe("TrimEach<T>", () => {

    it("happy path", () => {
        type T1 = TrimEach<["foo"," bar ", "\bbaz"]>;
        type T2 = TrimEach<["foo"," bar ", "\bbaz", 42]>;

        type cases = [
            Expect<Test<T1, "equals", ["foo","bar", "baz"]>>,
            Expect<Test<T2, "equals", ["foo","bar","baz",  42]>>,

        ];
    });

});
