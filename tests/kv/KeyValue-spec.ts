import { Equal, Expect } from "@type-challenges/utils";
import { KeyValue } from "~/types";

describe("KeyValue<T, K> type utility", () => {

  it("explicit KeyValue<T,K> definitions retain literal type info", () => {
    const obj = { foo: 1, bar: "hi", baz: { a: 1, b: 2 } } as const;
    type O = typeof obj;
    type Foo = KeyValue<O, "foo">;
    type Bar = KeyValue<O, "bar">;
    type Baz = KeyValue<O, "baz">;

    type cases = [
      Expect<Equal<Foo, ["foo", 1]>>,
      Expect<Equal<Bar, ["bar", "hi"]>>,
      Expect<Equal<Baz, ["baz", { readonly a: 1; readonly b: 2 }]>>,
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

});
