import { describe, it } from "vitest";
import { Xor } from "inferred-types/types";
import { Expect, Test } from "inferred-types/types";

describe("Xor type utility", () => {
    it("should return true when only one argument is true", () => {
        type TF = Xor<true, false>;
        type FT = Xor<false, true>;

        type cases = [
            Expect<Test<TF, "equals", true>>,
            Expect<Test<FT, "equals", true>>,
        ];
    });

    it("should return false when both arguments are true or both are false", () => {
        type T = Xor<true, true>;
        type F = Xor<false, false>;

        type cases = [
            Expect<Test<T, "equals", false>>,
            Expect<Test<F, "equals", false>>,
        ];
    });

    it("should return boolean when either argument is a wide type", () => {
        type cases = [
            Expect<Test<Xor<boolean, true>, "equals", boolean>>,
            Expect<Test<Xor<false, boolean>, "equals", boolean>>,
            Expect<Test<Xor<boolean, boolean>, "equals", boolean>>,
        ];
    });
});
