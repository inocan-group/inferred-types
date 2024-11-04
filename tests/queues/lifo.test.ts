import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { createLifoQueue, widen } from "inferred-types"
import { LifoQueue } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("LIFO Queue tests", () => {

  it("runtime basics", () => {
    let q = createLifoQueue(1,2,3);
    q.push(1,1,1);
    expect(q.queue).toEqual([1,2,3,1,1,1])
    const justOnes = q.take(3);
    expect(justOnes).toEqual([1,1,1]);
    expect(q.queue).toEqual([1,2,3]);

    let wq = createLifoQueue(...widen([1,2,3]))

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof q, LifoQueue<1 | 2 | 3>>>,
      Expect<Equal<typeof wq, LifoQueue<number>>>
    ];

  });

});
