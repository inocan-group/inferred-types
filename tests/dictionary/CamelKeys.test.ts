import { describe, it } from "vitest";
import { Expect, CamelKeys, Test } from "inferred-types/types";


describe("CamelKeys<T>", () => {

    it("happy path", () => {
        type Obj = { foo_bar: 42; BarBaz: 55; Opt?: "maybe" };
        type T = CamelKeys<Obj>;

        type cases = [
            Expect<Test<T, "equals", { fooBar: 42; barBaz: 55; opt?: "maybe" | undefined }>>
        ];
    });


    it("recursive/deep object", () => {
        type Obj = { foo_bar: { bar_baz: 42 }; up_down: 44 };
        type Deep = { foo_bar: { bar_baz: { up_down: 44 } } };
        type T = CamelKeys<Obj>;
        type TD = CamelKeys<Deep>;

        type cases = [
            Expect<Test<T, "equals", { fooBar: { barBaz: 42 }; upDown: 44 }>>
        ];
    });

});
