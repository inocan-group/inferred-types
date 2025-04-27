import {
    defineObj,
    DictionaryWithoutValueFilter,
    withoutValue
} from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";


describe("withoutValue(wo) => (obj) => obj", () => {
  const obj = defineObj({ foo: "hi", bar: 42, baz: 99, bax: "bye" })();

  it("strings", () => {

    const wide = withoutValue("string");
    const narrow = withoutValue("string(hi,hello)");

    const wideObj = wide(obj);
    const narrowObj = narrow(obj);

    expect(wideObj).toEqual({ bar: 42, baz: 99 });
    expect(narrowObj).toEqual({ bar: 42, baz: 99, bax: "bye" });

    // @ts-ignore
    type cases = [
      Expect<Test<typeof wide, "equals",  DictionaryWithoutValueFilter<string>>>,
      Expect<Test<typeof narrow, "equals",  DictionaryWithoutValueFilter<"hi" | "hello">>>,

      Expect<Test<typeof wideObj, "equals",  { bar: 42; baz: 99 }>>,
      Expect<Test<typeof narrowObj, "equals",  { bar: 42; baz: 99; bax: "bye" }>>,
    ];
  });

});
