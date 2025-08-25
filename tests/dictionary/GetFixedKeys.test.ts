import { describe, it } from "vitest";
import {
    DictionaryWithFixedKeys,
    Expect,
    GetFixedKeys,
    Test,
} from "inferred-types/types";

describe("DictionaryWithFixedKeys", () => {

    it("happy path", () => {
        type T1 = DictionaryWithFixedKeys<{ foo: 1; bar: 2; [x: `_${string}`]: number}>
        type T2 = DictionaryWithFixedKeys<{ foo: 1; bar: 2; [x: symbol]: number}>

        type cases = [
            Expect<Test<T1, "equals", { foo: 1; bar: 2 }>>,
            Expect<Test<T2, "equals", { foo: 1; bar: 2 }>>,
        ];
    });

})


describe("GetFixedKeys<T>", () => {

    it("happy path", () => {
        type T1 = GetFixedKeys<{ foo: 1; bar: 2; [x: `_${string}`]: number}>

        type cases = [
            Expect<Test<T1, "equals", "foo" | "bar">>
        ];
    });

});

