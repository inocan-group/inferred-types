import { describe, it } from "vitest";
import {
    Expect,
    IsEmptyObject,
    Test,
    Dictionary, EmptyObject
} from "inferred-types/types";

describe("IsEmptyObject", () => {
    it("should return true for object with no keys", () => {
        type T1 = IsEmptyObject<EmptyObject>;
        type T2 = IsEmptyObject<Record<never, any>>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
        ];
    });


    it("test", () => {
        type F1 = IsEmptyObject<Record<string,any>>;
        type F2 = IsEmptyObject<Record<string|symbol,string>>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });


    it("should return false for non-empty objects and primitives", () => {
        type F1 = IsEmptyObject<{ a: string }>;
        type F2 = IsEmptyObject<{ x: number; y: string }>;
        type F3 = IsEmptyObject<string>;
        type F4 = IsEmptyObject<number>;
        type F5 = IsEmptyObject<null>;
        type F6 = IsEmptyObject<undefined>;
        type F7 = IsEmptyObject<object>;
        type F8 = IsEmptyObject<Dictionary>;
        type F9 = IsEmptyObject<(() => "hi") & {}>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
            Expect<Test<F5, "equals", false>>,
            Expect<Test<F6, "equals", false>>,
            Expect<Test<F7, "equals", false>>,
            Expect<Test<F8, "equals", false>>,
            Expect<Test<F9, "equals", false>>,
        ];
    });
});


