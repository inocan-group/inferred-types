import { Expect, EmptyObject, FnKeyValue, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("FnProps", () => {

    it("happy path", () => {
        type Fn = () => "hi";
        type Obj = { foo: 1; bar: 2 };
        type Hybrid = Fn & Obj;

        type Props = FnKeyValue<Hybrid>;
        type Empty = FnKeyValue<Fn>;
        type Func = FnKeyValue<Function>;

        type cases = [
            Expect<Test<Props, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<Empty, "equals",  EmptyObject>>,
            Expect<Test<Func, "equals",  EmptyObject>>
        ];
    });

});
