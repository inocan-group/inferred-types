import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { createFifoQueue,  widen } from "inferred-types"
import { FifoQueue  } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("FIFO Queue tests", () => {

  it("runtime basics", () => {
    let q = createFifoQueue(1,2,3);
    q.push(1,1,1);
    expect(q.queue).toEqual([1,2,3,1,1,1])
    const justOnes = q.take(3);
    expect(justOnes).toEqual([1,2,3]);
    expect(q.queue).toEqual([1,1,1]);

    let wq = createFifoQueue(...widen([1,2,3]))
    wq.push(4,5,6);

    expect(wq.queue).toEqual([1,2,3,4,5,6]);
    let taken = wq.take(4);
    expect(taken).toEqual([1,2,3,4]);
    expect(wq.queue).toEqual([5,6]);


    type cases = [
      Expect<Equal<typeof q, FifoQueue<1 | 2 | 3>>>,
      Expect<Equal<typeof wq, FifoQueue<number>>>
    ];
    const cases: cases = [
      true, true
    ];
  });

});
