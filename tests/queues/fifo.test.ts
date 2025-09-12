import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import type { FifoQueue, Test } from "inferred-types/types";

import { createFifoQueue, widen } from "inferred-types/runtime"

describe("FIFO Queue tests", () => {

  it("runtime basics", () => {
    let q = createFifoQueue(1, 2, 3);
    q.push(1, 1, 1);
    expect(q.queue).toEqual([1, 2, 3, 1, 1, 1])
    const justOnes = q.take(3);
    expect(justOnes).toEqual([1, 2, 3]);
    expect(q.queue).toEqual([1, 1, 1]);

    let wq = createFifoQueue(...widen([1, 2, 3]))
    wq.push(4, 5, 6);

    expect(wq.queue).toEqual([1, 2, 3, 4, 5, 6]);
    let taken = wq.take(4);
    expect(taken).toEqual([1, 2, 3, 4]);
    expect(wq.queue).toEqual([5, 6]);

    type cases = [
      Expect<Test<typeof q, "equals",  FifoQueue<1 | 2 | 3>>>,
      Expect<Test<typeof wq, "equals",  FifoQueue<number>>>
    ];
    const cases: cases = [
      true, true
    ];
  });

});
