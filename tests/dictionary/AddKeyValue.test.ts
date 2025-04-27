import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AddKeyValue, DoesExtend, ErrorCondition, Test } from "inferred-types/types";



describe("AddKeyValue<TObj,K,V>", () => {

    it("happy path", () => {
        type Obj = { foo: 1; bar: 2 };

        type Valid = AddKeyValue<Obj, "baz", 42>;
        type Invalid = AddKeyValue<Obj, "foo", 42>;


        type cases = [
            Expect<Test<Valid, "equals",  { foo: 1; bar: 2; baz: 42 }>>,
            DoesExtend<Invalid, ErrorCondition<"duplicate-key">>
        ];
        const cases: cases = [true, true];
    });

});
