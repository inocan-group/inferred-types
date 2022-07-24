import { describe, it, expect } from "vitest";
import { createFnWithProps } from "../src/index";

describe("createFnWithProps()", () => {
  it("simple fn and prop are combined, type is retained", () => {
    const fn = () => "hi";
    const props = { foo: "bar" };
    const combo = createFnWithProps(fn, props);

    expect(combo.foo).toBe("bar");
    expect(combo()).toBe("hi");
  });
});
