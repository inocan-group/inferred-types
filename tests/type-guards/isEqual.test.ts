import { Expect, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";
import { isEqual } from "runtime/type-guards";


describe("isEqual(a)(b) type guard", () => {

  it("happy path", () => {
    const isFooBar = isEqual("foo", "bar");
    const t1 = isFooBar("foo");
    const t2 = isFooBar("bar" as string);
    const f1 = isFooBar("foot");
    const f2 = isFooBar("foot" as string);
    const f3 = isFooBar(42 as number);

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(f1).toBe(false);
    expect(f2).toBe(false);
    expect(f3).toBe(false);

  });


  it("type narrowing", () => {
    const isFooBar = isEqual("foo", "bar");
    const passing = "bar";
    const failing = "bart";
    const widePass = "foo" as string | undefined;
    const fooBarBaz = "foo" as "foo" | "bar" | "baz";


    if (isFooBar(passing)) {
      type V = typeof passing;

      type cases = [
        Expect<Test<V, "equals",  "bar">>
      ];
    } else {
      type NV = typeof passing;

      type cases = [
        Expect<Test<NV, "equals",  never>>
      ];
    }

    if (isFooBar(failing)) {
      type V = typeof failing;

      type cases = [
        Expect<Test<V, "equals",  never>>
      ];
    } else {
      type NV = typeof failing;

      type cases = [
        Expect<Test<NV, "equals",  "bart">>
      ];
    }

    if (isFooBar(widePass)) {
      type V = typeof widePass;

      type cases = [
        Expect<Test<V, "equals",  "foo" | "bar">>
      ];
    } else {
      type NV = typeof widePass;

      type cases = [
        Expect<Test<NV, "equals",  string | undefined>>
      ];
    }


    if (isFooBar(fooBarBaz)) {
      type V = typeof fooBarBaz;

      type cases = [
        Expect<Test<V, "equals",  "foo" | "bar">>
      ];
    } else {
      type NV = typeof fooBarBaz;

      type cases = [
        Expect<Test<NV, "equals",  "baz">>
      ];
    }


  });


});
