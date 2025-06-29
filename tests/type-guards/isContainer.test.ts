import { ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { narrow, isContainer, optional } from "inferred-types/runtime";
import { Container, DoesExtend, Expect, Test } from "inferred-types/types";



describe("isContainer(val)", () => {
  const lit_obj = { id: 1 } as { id: 1 } | null;
  const wide_obj = { id: 1 } as { id: number } | null;
  const lit_arr = narrow([1, 2, 3]) as unknown as readonly [1,2,3] | undefined;
  const wide_arr = [1, 2, 3] as number[] | undefined;

  it("literal object", () => {
    const v = isContainer(lit_obj);
    expect(v).toBe(true);

    if (isContainer(lit_obj)) {
      expect(true).toBe(true);

      type Value = typeof lit_obj;
      type cases = [
        ExpectTrue<DoesExtend<Value, { id: 1 }>>
      ];
    } else {
      throw new Error("lit_obj was NOT seen as a Container!");
    }
  });

  it("wide object", () => {
    const v = isContainer(wide_obj);
    expect(v).toBe(true);

    if (isContainer(wide_obj)) {
      expect(true).toBe(true);

      type Value = typeof wide_obj;
      type cases = [
        ExpectTrue<DoesExtend<Value, { id: number }>>
      ];
    } else {
      throw new Error("lit_obj was NOT seen as a Container!");
    }
  });

  it("literal array", () => {
    const v = isContainer(lit_arr);
    expect(v).toBe(true);

    if (isContainer(lit_arr)) {
      expect(true).toBe(true);

      type Value = typeof lit_arr;
      type cases = [
        Expect<Test<Value, "extends", readonly [1, 2, 3]>>
      ];
    } else {
      throw new Error("lit_arr was NOT seen as a Container!");
    }
  });

  it("wide array", () => {
    const v = isContainer(wide_arr);
    expect(v).toBe(true);

    if (isContainer(wide_arr)) {
      expect(true).toBe(true);

      type Value = typeof wide_arr;
      type cases = [
        ExpectTrue<DoesExtend<Value, Container>>
      ];
    } else {
      throw new Error("wide_arr was NOT seen as a Container!");
    }
  });

});
