import { Equal, Expect } from "@type-challenges/utils";
import { narrowObjectTo, narrowObjectToType } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("narrowObjectTo(constraint) -> (obj) -> obj", () => {

  it("first test", () => {
    const a = narrowObjectTo({foo: "string", bar: "Opt<number>"})
    const b = a({foo: "foo", bar: 42});

    const a2 = narrowObjectToType<{foo: string; bar?: number}>()
    const b2 = a2({foo: "foo", bar: 42});

    expect(b).toEqual({foo: "foo", bar: 42})


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof b, { foo: "foo"; bar: 42 }>>,
      Expect<Equal<typeof b2, { foo: "foo"; bar: 42 }>>
    ];
  });

});


