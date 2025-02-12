import { Equal, Expect } from "@type-challenges/utils";
import { asUnion, createEncoder } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("asUnion(elements,sep,pre,post)", () => {

  it("elements only", () => {
    const u = asUnion(["foo", "bar"]);
    expect(u).toBe(`foo | bar`);

    type cases = [
      Expect<Equal<typeof u, "foo" | "bar">>,
    ];
  });

  it("elements, with separator", () => {
    const u = asUnion(["foo", "bar"], "::");
    expect(u).toBe(`foo::bar`);

    type cases = [
      Expect<Equal<typeof u, "foo" | "bar">>,
    ];
  });

  it("elements, with separator and prefix", () => {
    const u = asUnion(["foo", "bar"], "::", { prefix: "string::" });
    expect(u).toBe(`string::foo::bar`);

    type cases = [
      Expect<Equal<typeof u, "foo" | "bar">>,
    ];
  });

  it("elements, with encoder and prefix", () => {
    const { encoder } = createEncoder({
      ["("]: "<<",
      [")"]: ">>"
    })
    const u = asUnion(["f(1)", "f(2)"], "::", { prefix: "string::", encoder });
    expect(u).toBe(`string::f<<1>>::f<<2>>`);

    type cases = [
      Expect<Equal<typeof u, "f(1)" | "f(2)">>,
    ];
  });

});
