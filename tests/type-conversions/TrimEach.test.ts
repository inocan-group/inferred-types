import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { TrimEach } from "../../modules/types/src/type-conversion/TrimEach";

describe("TrimEach<T>", () => {

    it("happy path", () => {
        type T1 = TrimEach<["foo"," bar ", "\bbaz"]>;
        type T2 = TrimEach<["foo"," bar ", "\bbaz", 42]>;


        type cases = [
            Expect<Test<T1, ["foo","bar", "equals", "baz"]>>,
            Expect<Test<T2, ["foo","bar","baz", "equals",  42]>>,

        ];
    });

});
