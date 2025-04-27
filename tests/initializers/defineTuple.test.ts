import { describe, expect, it } from "vitest";
import { defineTuple } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";



describe("createTuple(...values) runtime utility", () => {

  it("happy path", () => {
    const foobar = defineTuple("foo", "bar");
    const takeTwo = defineTuple(...foobar);

    const wideFoo = defineTuple(s => s.string(), "bar");

    expect(foobar).toEqual(["foo", "bar"]);
    expect(takeTwo).toEqual(["foo", "bar"]);
    expect(wideFoo).toEqual(["<<string>>", "bar"]);

    type cases = [
      Expect<Test<typeof foobar, "equals", ["foo", "bar"]>>,
      Expect<Test<typeof takeTwo,"equals", ["foo", "bar"]>>,
      Expect<Test<typeof wideFoo,"equals", [string, "bar"]>>,
    ];

  });


  it("passing a const array", () => {
    const arr = ["foo", "bar"] as const;
    const foobar = defineTuple(...arr);

    expect(foobar).toEqual(["foo", "bar"]);

    type cases = [
      Expect<Test<typeof foobar, "equals",  ["foo", "bar"]>>,
    ];
  });
});
