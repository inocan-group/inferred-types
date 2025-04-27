import { describe, it } from "vitest";
import { Expect, FnProps, RemoveFnProps, Test } from "inferred-types/types";


describe("RemoveFnProps<Fn>", () => {
    const fn = () => "hi" as const;
    const dict = { foo: "bar", baz: 42 } as const;
    type Fn = typeof fn;
    type Dict = typeof dict;

    it("isolating fn and dict with type utils", () => {
        type F1 = Fn & Dict;
        type JustFn = RemoveFnProps<F1>;
        type JustProps = FnProps<F1>;

        type cases = [
            Expect<Test<JustFn, "equals",  Fn>>,
            Expect<Test<JustProps, "equals",  Dict>>,
        ];
    });



});
