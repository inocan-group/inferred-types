import { describe, expect, it } from "vitest";
import { defineTuple } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";



describe("createTuple(...values) runtime utility", () => {

  it("happy path", () => {
    const foobar = defineTuple("foo", "bar");
    const takeTwo = defineTuple(...foobar);


    expect(foobar).toEqual(["foo", "bar"]);
    expect(takeTwo).toEqual(["foo", "bar"]);

    type cases = [
      Expect<Test<typeof foobar, "equals", readonly ["foo", "bar"]>>,
      Expect<Test<typeof takeTwo,"equals", readonly ["foo", "bar"]>>,
    ];

  });


  it("passing a const array", () => {
    const arr = ["foo", "bar"] as const;
    const foobar = defineTuple(...arr);

    expect(foobar).toEqual(["foo", "bar"]);

    type cases = [
      Expect<Test<typeof foobar, "equals",  readonly ["foo", "bar"]>>,
    ];
  });
});
