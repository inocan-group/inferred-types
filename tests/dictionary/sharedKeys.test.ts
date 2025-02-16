/* eslint-disable ts/ban-types */
import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import type { Contains, HasSameValues, SharedKeys } from "inferred-types/types";
import { sharedKeys } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("SharedKeys", () => {

  it("happy path", () => {
    type A = { foo: 1; bar: 23; color: "blue" };
    type B = { bar: 55; baz: 66; color: "red" };
    type Shared = SharedKeys<A, B>;
    type Identity = SharedKeys<A, A>;
    type None = SharedKeys<A, {}>;
    type None2 = SharedKeys<A, object>;

    type cases = [
      Expect<HasSameValues<Shared, ["bar", "color"]>>,
      Expect<HasSameValues<Identity, ["foo", "bar", "color"]>>,
      Expect<ExpectTrue<Contains<Identity, "foo">>>,
      Expect<Equal<None, []>>,
      Expect<Equal<None2, []>>,
    ];
    const cases: cases = [true, true, true, true, true];
  });

});

describe("sharedKeys(a,b)", () => {

  it("happy path", () => {
    const a = { foo: 1, bar: 23, color: "blue" };
    const b = { bar: 55, baz: 66, color: "red" };

    const shared = sharedKeys(a, b);
    expect(shared).toEqual(["bar", "color"]);
  });

});

