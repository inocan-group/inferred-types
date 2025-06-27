import {
    IsObjectLiteral,
    Dictionary,
    Test,
    Expect,
    IsWideObject,
    Not
} from "inferred-types/types";
import { describe, it } from "vitest";



describe("IsObjectLiteral<T>", () => {

    it("happy path", () => {
        type T1 = IsObjectLiteral<{ foo: 1 }>;
        type T2 = IsObjectLiteral<Readonly<{ foo: 1 }>>;

        type F1 = IsObjectLiteral<object>;
        type F2 = IsObjectLiteral<Dictionary>;
        type F3 = IsObjectLiteral<Record<string, string>>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });


    it("inverse of IsObjectLiteral<T> is IsWideObject<T>", () => {
        type T1 = IsObjectLiteral<{ foo: 1 }>;
        type I1 = Not<IsWideObject<{ foo: 1 }>>;

        type T2 = IsObjectLiteral<Readonly<{ foo: 1 }>>;
        type I2 = Not<IsWideObject<Readonly<{ foo: 1 }>>>;

        type T3 = IsObjectLiteral<object>;
        type I3 = Not<IsWideObject<object>>;

        type T4 = IsObjectLiteral<Dictionary>;
        type I4 = Not<IsWideObject<Dictionary>>;

        type T5 = IsObjectLiteral<Record<string, string>>;
        type I5 = Not<IsWideObject<Record<string, string>>>;

        type cases = [
            Expect<Test<T1, "equals", I1>>,
            Expect<Test<T2, "equals", I2>>,
            Expect<Test<T3, "equals", I3>>,
            Expect<Test<T4, "equals", I4>>,
            Expect<Test<T5, "equals", I5>>,
        ];
    });
});
