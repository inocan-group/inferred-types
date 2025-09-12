import { identity } from "inferred-types/runtime";
import type { Expect, Test } from "inferred-types/types";

import { describe, expect, it } from "vitest";

describe("identity() runtime util", () => {

  it("happy path", () => {
    const obj = identity({
      foo: 42,
      bar: "hi"
    });
    expect(obj).toEqual({ foo: 42, bar: "hi" });

    const tup = identity(4, 5, 6);
    expect(tup).toEqual([4, 5, 6]);

    const undef = identity();
    expect(undef).toEqual(undefined);

    const undef2 = identity(undefined);
    expect(undef2).toEqual(undefined);

    const scalar = identity(42);
    expect(scalar).toEqual(42);

    // @ts-ignore
    type cases = [
      Expect<Test<typeof obj, "equals",  { foo: 42; bar: "hi" }>>,
      Expect<Test<typeof tup, "equals",  [4, 5, 6]>>,
      Expect<Test<typeof undef, "equals",  undefined>>,
      Expect<Test<typeof undef2, "equals",  undefined>>,
      Expect<Test<typeof scalar, "equals",  42>>,
    ];
  });

});
