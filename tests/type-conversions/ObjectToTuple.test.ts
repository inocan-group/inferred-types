import { Equal, Expect } from "@type-challenges/utils";
import { KeyValue, ObjectToTuple } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ObjectToTuple<T>", () => {

  it("happy path", () => {
    type FooBar = ObjectToTuple<{foo: 1; bar: 2}>;
    type Empty = ObjectToTuple<{}>;
    type Wide = ObjectToTuple<object>;

    // @ts-ignore
    type cases = [
      Expect<Equal<FooBar, [ {key: "foo", value: 1}, {key: "bar", value: 2} ]>>,
      Expect<Equal<Empty, []>>,
      Expect<Equal<Wide, KeyValue[]>>
    ];
  });

});
