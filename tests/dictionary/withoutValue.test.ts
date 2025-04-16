import { Equal, Expect } from "@type-challenges/utils";
import { defineObjectType } from "inferred-types/runtime";
import { DictionaryWithoutValueFilter, withoutValue } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";


describe("withoutValue(wo) => (obj) => obj", () => {
  const obj = defineObjectType({ foo: "hi", bar: 42, baz: 99, bax: "bye" })();

  it("strings", () => {

    const wide = withoutValue("string");
    const narrow = withoutValue("string(hi,hello)");

    const wideObj = wide(obj);
    const narrowObj = narrow(obj);

    expect(wideObj).toEqual({ bar: 42, baz: 99 });
    expect(narrowObj).toEqual({ bar: 42, baz: 99, bax: "bye" });

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof wide, DictionaryWithoutValueFilter<string>>>,
      Expect<Equal<typeof narrow, DictionaryWithoutValueFilter<"hi" | "hello">>>,

      Expect<Equal<typeof wideObj, { bar: 42; baz: 99 }>>,
      Expect<Equal<typeof narrowObj, { bar: 42; baz: 99; bax: "bye" }>>,
    ];
  });

});
