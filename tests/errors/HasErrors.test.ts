import { describe, it } from "vitest";
import type { Err, Expect, HasErrors, Test } from "inferred-types/types";

describe("HasErrors<T,[U]>", () => {

    it("Tuple with errors", () => {
        type T1 = HasErrors<[1,2,Err<"oops">]>;
        type T2 = HasErrors<[Err<"oops">]>;
        type T3 = HasErrors<[Err<"oops">,Err<"oops">]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("Tuple with specific errors", () => {
        type T1 = HasErrors<[1,2,Err<"oops">], "oops">;
        type T2 = HasErrors<[Err<"oops">, Err<"shit">], "oops">;
        type T3 = HasErrors<[Err<"oops">, Err<"shit">], "shit">;

        type F1 = HasErrors<[1,2,3], "oops">;
        type F2 = HasErrors<[1,2,3, Error], "oops">;
        type F3 = HasErrors<[1,2,3, Err<"shit">], "oops">;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

    it("Tuple without errors", () => {
        type T1 = HasErrors<[1,2]>;
        type T2 = HasErrors<[]>;
        type T3 = HasErrors<[1]>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
        ];
    });

    it("dictionary with errors", () => {
        type T1 = HasErrors<{foo:1; bar: Err<"oops"> }>;
        type T2 = HasErrors<{foo: Err<"oops">; bar: Err<"oops"> }>;
        type T3 = HasErrors<{bar: Err<"oops"> }>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });

    it("dictionary without errors", () => {
        type T1 = HasErrors<{foo:1; bar: 2 }>;
        type T2 = HasErrors<{foo: 1 }>;
        type T3 = HasErrors<{ }>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
            Expect<Test<T3, "equals", false>>,
        ];
    });
});
