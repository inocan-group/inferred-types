import { describe, expect, it } from "vitest";
import { asUnion } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";

describe("asUnion(elements,sep,pre,post)", () => {

  it("elements only", () => {
    const u = asUnion(["foo", "bar"]);
    expect(u).toBe(`foo | bar`);

    type cases = [
      Expect<Test<typeof u, "equals",  "foo" | "bar">>,
    ];
  });

  it("elements, with separator", () => {
    const u = asUnion(["foo", "bar"], "::");
    expect(u).toBe(`foo::bar`);

    type cases = [
      Expect<Test<typeof u, "equals",  "foo" | "bar">>,
    ];
  });

  it("elements, with separator and prefix", () => {
    const u = asUnion(["foo", "bar"], "::", { prefix: "string::" });
    expect(u).toBe(`string::foo::bar`);

    type cases = [
      Expect<Test<typeof u, "equals",  "foo" | "bar">>,
    ];
  });

});
