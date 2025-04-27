import { Equal, Expect } from "@type-challenges/utils";
import { KeyValue, ObjectKey, ObjectToTuple } from "inferred-types/types";
import { describe, it } from "vitest";



describe("ObjectToTuple<T>", () => {

  it("happy path", () => {
    type FooBar = ObjectToTuple<{foo: 1; bar: 2}>;
    type Empty = ObjectToTuple<{}>;
    type Wide = ObjectToTuple<object>;

    // @ts-ignore
    type cases = [
      Expect<Test<FooBar, [ {key: "foo", value: 1}, {key: "bar", "equals",  value: 2} ]>>,
      Expect<Test<Empty, "equals",  []>>,
      Expect<Test<Wide, "equals",  KeyValue[]>>
    ];
  });


  it("compact output", () => {
    type FooBar = ObjectToTuple<{foo: 1; bar: 2}, true>;
    type Empty = ObjectToTuple<{}, true>;
    type Wide = ObjectToTuple<object, true>;

    // @ts-ignore
    type cases = [
      Expect<Test<FooBar, [ Record<"foo", 1>, Record<"bar", "equals",  2> ]>>,
      Expect<Test<Empty, "equals",  []>>,
      Expect<Test<Wide, Record<ObjectKey, "equals",  any>[]>>
    ];

  });


});
