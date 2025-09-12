import { describe, it } from "vitest";
import type { Expect, IdentityFn, Test } from "inferred-types/types";

describe("IdentityFn<T,[TNarrow]>", () => {

    it("Regular Identity", () => {
        type Num = IdentityFn<number>;
        type Lit = IdentityFn<42>;

        type cases = [
            Expect<Test<Num, "equals",  () => number>>,
            Expect<Test<Lit, "equals",  () => 42>>,
        ];
    });

    it("with narrowing", () => {
        type Num = IdentityFn<number, true>;
        type Str = IdentityFn<string, true>;
        type WideUnion = IdentityFn<string | number, true>;
        type LitUnion = IdentityFn<42 | 56 | 78, true>;
        type Bool = IdentityFn<boolean, true>;

        type Err = IdentityFn<42, true>;
        type Err2 = IdentityFn<true, true>;

        type cases = [
            Expect<Test<Num, "equals",  <T extends number>(v: T) => T>>,
            Expect<Test<Str, "equals",  <T extends string>(v: T) => T>>,
            Expect<Test<WideUnion, "equals",  <T extends string | number>(v: T) => T>>,
            Expect<Test<LitUnion, "equals",  <T extends 42 | 56 | 78>(v: T) => T>>,
            Expect<Test<Bool, "equals",  <T extends boolean>(v: T) => T>>,

            Expect<Test<
                Err, "isError", "invalid-literal"
            >>,
            Expect<Test<
                Err2, "isError", "invalid-literal"
            >>,
        ];
    });

});
