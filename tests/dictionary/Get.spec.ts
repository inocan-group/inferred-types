import { Equal, Expect } from "@type-challenges/utils";
import { Get } from "~/types";
import { defineType } from "~/utility";

describe("Get<T, K> type utility", () => {

  it("Get<T,K> works with literals and wide types", () => {
    const input = defineType({ id: 1234 })({ foo: 1, bar: "hi" });
    type Input = typeof input;

    type Id = Get<Input, "id">;
    type Foo = Get<Input, "foo">;
    type Bar = Get<Input, "bar">;

    type cases = [
      Expect<Equal<Id, 1234>>,
      Expect<Equal<Foo, number>>,
      Expect<Equal<Bar, string>>,
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

});
