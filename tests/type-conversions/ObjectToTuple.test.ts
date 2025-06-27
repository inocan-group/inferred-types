import { KeyValue, Expect, ObjectToTuple, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ObjectToTuple<T>", () => {

    it("happy path", () => {
        type FooBar = ObjectToTuple<{ foo: 1; bar: 2 }>;
        type Empty = ObjectToTuple<{}>;
        type Wide = ObjectToTuple<object>;

        // @ts-ignore
        type cases = [
            Expect<Test<
                FooBar, "equals",
                [{ key: "foo", value: 1 }, { key: "bar", value: 2 }]
            >>,
            Expect<Test<Empty, "equals", []>>,
            Expect<Test<Wide, "equals", KeyValue[]>>
        ];
    });



});
