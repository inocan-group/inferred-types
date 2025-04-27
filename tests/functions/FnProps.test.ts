import { Expect, EmptyObject, FnProps, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("FnProps", () => {

    it("happy path", () => {
        type Fn = () => "hi";
        type Obj = { foo: 1; bar: 2 };
        type Hybrid = Fn & Obj;

        type Props = FnProps<Hybrid>;
        type Empty = FnProps<Fn>;
        type Func = FnProps<Function>;

        type cases = [
            Expect<Test<Props, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<Empty, "equals",  EmptyObject>>,
            Expect<Test<Func, "equals",  EmptyObject>>
        ];
    });

});
