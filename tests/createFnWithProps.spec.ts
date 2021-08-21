/* eslint-disable unicorn/consistent-function-scoping */
import { createFnWithProps } from "~/index";

describe("createFnWithProps()", () => {
  it("simple fn and prop are combined, type is retained", () => {
    const fn = () => "hi";
    const props = { foo: "bar" };
    const combo = createFnWithProps(fn, props);

    expect(combo.foo).toBe("bar");
    expect(combo()).toBe("hi");
  });
});
