import { Equal, Expect } from "@type-challenges/utils";
import { identity } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

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
      Expect<Equal<typeof obj, { foo: 42; bar: "hi" }>>,
      Expect<Equal<typeof tup, [4, 5, 6]>>,
      Expect<Equal<typeof undef, undefined>>,
      Expect<Equal<typeof undef2, undefined>>,
      Expect<Equal<typeof scalar, 42>>,
    ];
  });

});
