import { describe, it } from "vitest";
import { Expect, Concat, Test } from "inferred-types/types";



describe("Concat<T>", () => {

    it("literals", () => {
        type T1 = Concat<["foo"]>; // foo
        type T2 = Concat<["foo", "bar", "baz"]>; // foobarbaz
        type T3 = Concat<["foo", 42, "bar"]>; //foo42bar
        type T4 = Concat<["foo", "-is-", true]>;

        type cases = [
            Expect<Test<T1, "equals",  "foo">>, //
            Expect<Test<T2, "equals",  "foobarbaz">>,
            Expect<Test<T3, "equals",  "foo42bar">>,
            Expect<Test<T4, "equals",  "foo-is-true">>,
        ];
    });


    it("wide types", () => {
        type T1 = Concat<[string]>;
        type T2 = Concat<[string, string, string]>;
        type T3 = Concat<[string, number, string]>;
        type T4 = Concat<[string, number, boolean]>;

        type cases = [
            Expect<Test<T1, "equals",  string>>, //
            Expect<Test<T2, "equals",  string>>,
            Expect<Test<T3, "equals",  `${string}${number}${string}`>>,
            Expect<Test<T4, "equals",  `${string}${number}${boolean}`>>,
        ];
    });

    it("mixed", () => {
        type T2 = Concat<[string, "-", string]>;
        type T3 = Concat<[string, 42, string]>;

        type cases = [
            Expect<Test<T2, "equals",  `${string}-${string}`>>,
            Expect<Test<T3, "equals",  `${string}42${string}`>>,
        ];
    });


});
