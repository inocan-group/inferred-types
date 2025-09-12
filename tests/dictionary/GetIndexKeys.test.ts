import { describe, it } from "vitest";
import type { DictionaryWithIndexKeys, Expect, GetIndexKeys, Test, UpperAlphaChar } from "inferred-types/types";

describe("DictionaryWithIndexKeys", () => {

    it("happy path", () => {
        type T1 = DictionaryWithIndexKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;
        type T2 = DictionaryWithIndexKeys<{ foo: 1; bar: 2; [x: `_${string}`]: string }>;
        type T3 = DictionaryWithIndexKeys<{ foo: 1; bar: 2} & Record<`_${string}`, string>>;

        type cases = [
            // Regular index signatures work
            Expect<Test<T1, "equals", { [x: string]: unknown }>>,
            // So do template literal signatures
            Expect<Test<T2, "equals", { [x: `_${string}`]: string }>>,
            Expect<Test<T3, "equals", { [x: `_${string}`]: string }>>,
        ];
    });

    it("multiple indexes", () => {
        type T1 = DictionaryWithIndexKeys<{ foo: 1; [x: `_${string}`]: string; [y: `${UpperAlphaChar}${string}`]: number }>;

        type cases = [
            Expect<Test<T1, "equals", { [x: `_${string}`]: string; [x: `${UpperAlphaChar}${string}`]: number }>>
        ];
    });

});

describe("GetIndexKeys", () => {

    it("happy path", () => {
        type T1 = GetIndexKeys<{ foo: 1; bar: 2; [x: string]: unknown }>;
        type T2 = GetIndexKeys<{ foo: 1; bar: 2; [x: `_${string}`]: string }>;
        type T3 = GetIndexKeys<{ foo: 1; bar: 2} & Record<`_${string}`, string>>;

        type cases = [
            // Regular index signatures work
            Expect<Test<T1, "equals", string>>,
            // So do template literal signatures
            Expect<Test<T2, "equals", `_${string}`>>,
            Expect<Test<T3, "equals", `_${string}`>>,
        ];
    });
})
