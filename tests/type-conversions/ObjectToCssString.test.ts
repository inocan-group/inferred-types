
import { describe, it } from "vitest";
import type { Expect, ExplicitlyEmptyObject, ObjectToCssString, Test } from "inferred-types/types";

describe("ObjectToCssString<T>", () => {

    it("happy path", () => {
        type Empty = ObjectToCssString<{}>;
        type ExplicitlyEmpty = ObjectToCssString<ExplicitlyEmptyObject>;
        type Obj = ObjectToCssString<object>;

        type FooBar = ObjectToCssString<{ foo: 1; bar: 2 }>;
        type StrBool = ObjectToCssString<{ foo: "20px"; bar: "40px" }>;

        type cases = [
            Expect<Test<Empty, "equals", "{}">>,
            Expect<Test<ExplicitlyEmpty, "equals", "{}">>,
            Expect<Test<Obj, "equals", string>>,

            Expect<Test<FooBar, "containsAll", [ "foo: 1", "bar: 2"]>>,
            Expect<Test<FooBar, "extends", `{${string}}`>>,
            Expect<Test<StrBool, "containsAll", [ "foo: 20px", "bar: 40px"]>>,
            Expect<Test<StrBool, "extends", `{${string}}`>>,
        ];
    });

});
