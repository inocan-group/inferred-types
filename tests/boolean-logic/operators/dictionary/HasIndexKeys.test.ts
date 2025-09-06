import { describe, it } from "vitest";
import {
    Expect,
    HasIndexKeys,
    Test,
} from "inferred-types/types";

describe("HasIndexKeys<T>", () => {

    it("happy path", () => {
        type T1 = HasIndexKeys<{foo: 1; [x: symbol]: number}>;
        type T2 = HasIndexKeys<{foo: 1; [x: string]: number}>;
        type T3 = HasIndexKeys<{[x: symbol]: number}>;
        type T4 = HasIndexKeys<{[x: string]: number}>;
        type T5 = HasIndexKeys<{foo:1; bar: "hi"; [x: number]: string}>;

        type F1 = HasIndexKeys<{foo: 1}>;
        type F2 = HasIndexKeys<{foo: 1; bar: 2 }>;

        type cases = [
            Expect<Test<T1, "equals" , true>>,
            Expect<Test<T2, "equals" , true>>,
            Expect<Test<T3, "equals" , true>>,
            Expect<Test<T4, "equals" , true>>,
            Expect<Test<T5, "equals" , true>>,

            Expect<Test<F1, "equals" , false>>,
            Expect<Test<F2, "equals" , false>>,

        ];
    });


    it("can detect template literal indexes", () => {
        type T1 = HasIndexKeys<{foo: 1; [key: `_${string}`]: string }>;

        type cases = [
            Expect<Test<T1, "equals", true>>
        ];
    });


});
