import { Equal, Expect } from "@type-challenges/utils";
import { asString, isError, pipeline } from "inferred-types/runtime";
import { Equals, Err, Extends } from "inferred-types/types";
import { describe, expect, it } from "vitest";
import { typedError } from "inferred-types/runtime";

describe("pipeline()", () => {

  it("happy path", () => {
    const foo = "foo" as "foo" | Error;

    const p1 = pipeline(
        foo,
        "bar",
        "baz"
    );

    expect(p1).toBe("baz");

    type cases = [
      Expect<Test<typeof p1, "equals",  "baz">>
    ];
  });


  it("with error in pipeline", () => {
    const p1 = pipeline(
        "foo",
        "bar",
        new Error("oops"),
        "baz"
    );
    const p2 = pipeline(
        "foo",
        "bar",
        typedError("oops"),
        "baz"
    );

    expect(isError(p1)).toBe(true);
    expect(isError(p2)).toBe(true);

    type cases = [
        Expect<Equals<typeof p1, Error>>,
        Expect<Equals<typeof p1, Error>>,
    ];
  });


  it("concatinate results", () => {
    const p1 = pipeline(
        "foo",
        (v) => `${asString(v)}-bar`,
        (v) => `${asString(v)}-baz`
    )

    expect(p1).toBe(`foo-bar-baz`)

    type cases = [
      Expect<Test<typeof p1, "equals",  "foo-bar-baz">>
    ];
  });


});
