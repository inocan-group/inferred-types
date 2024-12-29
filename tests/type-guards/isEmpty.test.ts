import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { isEmpty } from "inferred-types/runtime"
import { Empty } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isEmpty(val)", () => {

  it("happy path", () => {
    const t1 = isEmpty(null);
    const t2 = isEmpty(undefined);
    const t3 = isEmpty("");
    const t4 = isEmpty([]);
    const t5 = isEmpty({});

    expect(t1).toEqual(true);
    expect(t2).toEqual(true);
    expect(t3).toEqual(true);
    expect(t4).toEqual(true);
    expect(t5).toEqual(true);

    const f1 = isEmpty(" ");
    const f2 = isEmpty({f: undefined});
    const f3 = isEmpty(["foo"] as string[]);
    const f4 = isEmpty(4);

    expect(f1).toEqual(false);
    expect(f2).toEqual(false);
    expect(f3).toEqual(false);
    expect(f4).toEqual(false);

    const foo = ["foo"] as string[];

    const str = "" as string;

    if(isEmpty(foo)) {
      type T = typeof foo;

      // @ts-ignore
      type cases = [
        Expect<Equal<T, string[] & Empty>>
      ];
    }

    if(isEmpty(str)) {
      type T = typeof str;

      // @ts-ignore
      type cases = [
        Expect<Equal<T, string & Empty>>
      ];
    }


  });

});


