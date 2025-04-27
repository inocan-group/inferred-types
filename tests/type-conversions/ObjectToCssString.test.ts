import { Equal, Expect } from "@type-challenges/utils";
import { ObjectToCssString, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ObjectToCssString<T>", () => {

  it("happy path", () => {
    type FooBar = ObjectToCssString<{ foo: 1; bar: 2 }>;
    type StrBool = ObjectToCssString<{ foo: "20px"; bar: "40px" }>;

    // @ts-ignore
    type cases = [
      Expect<Test<FooBar, "equals",  "{ foo: 1; bar: 2 }" >>,
      Expect<Test<StrBool, "equals",  `{ foo: 20px; bar: 40px }` >>,
    ];
  });

});
