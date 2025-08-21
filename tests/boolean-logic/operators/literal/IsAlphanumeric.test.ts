import { describe, it } from "vitest";
import {
    Expect,
    Test,
    IsAlphanumeric
} from "inferred-types/types";

describe("IsAlphanumeric<T,U>", () => {

    it("happy path", () => {
        type T1 = IsAlphanumeric<"foobar">;
        type T2 = IsAlphanumeric<"foobar42">;
        type T3 = IsAlphanumeric<"42foobar42">;
        type T4 = IsAlphanumeric<"42foobar">;
        type T5 = IsAlphanumeric<"">;

        type F1 = IsAlphanumeric<"foobar ">;
        type F2 = IsAlphanumeric<" foobar ">;
        type F3 = IsAlphanumeric<" foobar">;
        type F4 = IsAlphanumeric<"foo bar">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,
            Expect<Test<T5, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
            Expect<Test<F4, "equals", false>>,
        ];
    });


    it("wide types", () => {
        type W1 = IsAlphanumeric<string>;
        // regardless of what `U` will be at runtime
        // the string IS alphanumeric!
        type W2 = IsAlphanumeric<"foobar", string>;
        type W3 = IsAlphanumeric<"foobar!", string>;

        type cases = [
            Expect<Test<W1, "equals", boolean>>,
            Expect<Test<W2, "equals", true>>,
            Expect<Test<W3, "equals", boolean>>,
        ];
    });


    it("adding characters to validation", () => {
        type T1 = IsAlphanumeric<"foobar", "!">;
        type T2 = IsAlphanumeric<"foobar!", "!">;
        type T3 = IsAlphanumeric<"foobar!", "!" | "#">;
        type T4 = IsAlphanumeric<"foo_bar-baz", "_" | "-">;

        type F1 = IsAlphanumeric<"foo bar!", "!">;
        type F2 = IsAlphanumeric<" foobar!", "!">;
        type F3 = IsAlphanumeric<"foobar! ", "!">;


        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
            Expect<Test<T4, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });




});
