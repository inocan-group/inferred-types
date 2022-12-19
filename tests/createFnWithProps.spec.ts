import { createFnWithProps } from "src/runtime/createFnWithProps";
import { describe, it, expect } from "vitest";


describe("createFnWithProps()", () => {
  it("simple fn and prop are combined, type is retained", () => {
    const fn = () => "hi";
    const props = { foo: "bar" };
    /** combo */
    const combo = createFnWithProps(fn, props);

    expect(combo.foo).toBe("bar");
    expect(combo()).toBe("hi");
  });
});
