import { Equal, Expect } from "@type-challenges/utils";
import { ObjectToJsString, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ObjectToJsString<T>", () => {

  it("happy path", () => {
    type FooBar = ObjectToJsString<{ foo: 1; bar: 2 }>;
    type StrBool = ObjectToJsString<{ foo: "bar"; bar: false }>;

    // @ts-ignore
    type cases = [
        Expect<Test<
            FooBar,
            "equals",
            "{ foo: 1, bar: 2 }"
        >>,
        Expect<Test<
            StrBool,
            "equals",
            `{ foo: "bar", bar: false }`
        >>,
    ];
  });

});
