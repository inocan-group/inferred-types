import { describe, it } from "vitest";
import type {
    OnlyFixedKeys,
    Expect,
    GetFixedKeys,
    Test,
    AssertEqual
} from "inferred-types/types";

describe("GetFixedKeys<T>", () => {

    it("Fixed with wide string index", () => {
        type T1 = GetFixedKeys<{ foo: 1; bar: 2; [x: string]: number}>

        type cases = [
            Expect<Test<T1, "equals", "foo" | "bar">>
        ];
    });

    it("Fixed with symbol index", () => {
        type T1 = GetFixedKeys<{ foo: 1; bar: 2; [x: symbol]: number}>

        type cases = [
            Expect<Test<T1, "equals", "foo" | "bar">>
        ];
    });

    it("Fixed with template literal index", () => {
        type T1 = GetFixedKeys<{ foo: 1; bar: 2; [x: `_${string}`]: number}>

        type cases = [
            Expect<Test<T1, "equals", "foo" | "bar">>
        ];
    });



    it("Fixed keys with string and symbol indexes", () => {
        type T1 = GetFixedKeys<{ foo: 1; bar: 2; [x: string]: number; [y: symbol]: string}>

        type cases = [
            Expect<Test<T1, "equals", "foo" | "bar">>
        ];
    });

    it("Fixed keys with template literal and symbol indexes", () => {
        type T1 = GetFixedKeys<
            { foo: 1; bar: 2; [x: `_${string}`]: number; [y: symbol]: string}
        >

        type cases = [
            Expect<Test<T1, "equals", "foo" | "bar">>
        ];
    });


});

describe("OnlyFixedKeys", () => {

    it("happy path", () => {
        type T1 = OnlyFixedKeys<{ foo: 1; bar: 2; [x: `_${string}`]: number}>
        type T2 = OnlyFixedKeys<{ foo: 1; bar: 2; [x: string]: number}>
        type T3 = OnlyFixedKeys<{ foo: 1; bar: 2; [x: string]: number; [y: symbol]: string}>
        type T4 = OnlyFixedKeys<
            { foo: 1; bar: 2; [x: `_${string}`]: number; [y: symbol]: string}
        >

        type cases = [
            Expect<AssertEqual<T1, { foo: 1; bar: 2 }>>,
            Expect<AssertEqual<T2, { foo: 1; bar: 2 }>>,
            Expect<AssertEqual<T3, { foo: 1; bar: 2 }>>,
            Expect<AssertEqual<T4, { foo: 1; bar: 2 }>>,
        ];
    });

})
