import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { defineTuple } from "inferred-types/runtime";



describe("createTuple(...values) runtime utility", () => {

  it("happy path", () => {
    const foobar = defineTuple("foo", "bar");
    const takeTwo = defineTuple(...foobar);

    const wideFoo = defineTuple(s => s.string(), "bar");

    expect(foobar).toEqual(["foo", "bar"]);
    expect(takeTwo).toEqual(["foo", "bar"]);
    expect(wideFoo).toEqual(["<<string>>", "bar"]);

    type cases = [
      Expect<Test<typeof foobar, ["foo", "equals",  "bar"]>>,
      Expect<Test<typeof takeTwo, ["foo", "equals",  "bar"]>>,
      Expect<Test<typeof wideFoo, [string, "equals",  "bar"]>>,
    ];
    const cases: cases = [true, true, true];
  });


  it("passing a const array", () => {
    const arr = ["foo", "bar"] as const;
    const foobar = defineTuple(...arr);

    expect(foobar).toEqual(["foo", "bar"]);

    type cases = [
      Expect<Test<typeof foobar, ["foo", "equals",  "bar"]>>,
    ];
    const cases: cases = [true];
  });
});
