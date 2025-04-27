import { Equal, Expect } from "@type-challenges/utils";
import { ErrorCondition, OnPass } from "inferred-types/types";
import { describe, it } from "vitest";



describe("OnPass<TTest,TPass", () => {

    it("Happy Path", () => {
        type P1 = OnPass<true, "pass">;
        type P2 = OnPass<[], "pass">;
        type P3 = OnPass<42, "pass">;

        type FF = OnPass<false, "pass">;
        type FN = OnPass<never, "pass">;
        type FE = OnPass<ErrorCondition<"bad-juju">, "pass">;

        type Mapper = { false: "mapped"; never: "mapped"; error: "mapped" };

        type RF = OnPass<false, "mapped", Mapper>;
        type RE = OnPass<ErrorCondition, "mapped", { error: "mapped" }>;


        type cases = [
            Expect<Test<P1, "equals",  "pass">>,
            Expect<Test<P2, "equals",  "pass">>,
            Expect<Test<P3, "equals",  "pass">>,

            Expect<Test<FF, "equals",  false>>,
            Expect<Test<FN, "equals",  never>>,
            Expect<Test<FE, "equals",  ErrorCondition<"bad-juju">>>,

            Expect<Test<RF, "equals",  "mapped">>,
            Expect<Test<RE, "equals",  "mapped">>,
        ];
        const cases: cases = [
            true, true, true,
            true, true, true,
            true, true
        ];
    });

});
