import { Expect, AsNumber, IsNever, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("AsNumber<T>", () => {

    it("Happy Path", () => {
        type Int = AsNumber<"3">;
        type Float = AsNumber<"3.4">;
        type NegInt = AsNumber<"-3">;
        type NegFloat = AsNumber<"-3.4">;

        type cases = [
            Expect<Test<Int, "equals",  3>>,
            Expect<Test<Float, "equals",  3.4>>,
            Expect<Test<NegInt, "equals",  -3>>,
            Expect<Test<NegFloat, "equals",  -3.4>>,

            IsNever<AsNumber<"foobar">>
        ];
    });

});
