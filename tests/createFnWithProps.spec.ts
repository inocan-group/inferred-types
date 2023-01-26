import { createFnWithProps } from "runtime/functions";
import { describe, it, expect } from "vitest";

describe("createFnWithProps()", () => {
  it("simple fn and prop are combined, type is retained", () => {
    const fn = () => "hi" as const;
    const props = { foo: "bar" };
    const combo = createFnWithProps(fn, props);

    expect(combo.foo).toBe("bar");
    expect(combo()).toBe("hi");
  });
});
