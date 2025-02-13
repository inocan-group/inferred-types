import { Equal, Expect } from "@type-challenges/utils";
import { isStringLiteral } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("isStringLiteral()()", () => {

  it("happy path", () => {
    const tg = isStringLiteral("foo", "bar", "baz");

    expect(tg("foo")).toBe(true);
    expect(tg("bar")).toBe(true);
    expect(tg("baz")).toBe(true);
    expect(tg("bax")).toBe(false);


    type cases = [
      Expect<Equal<typeof tg, (val: unknown) => val is "foo" | "bar" | "baz">>,
    ];
  });

});
