import { describe, expect, it } from "vitest";
import { createLifoQueue, widen } from "inferred-types/runtime"
import type { Expect, LifoQueue, Test } from "inferred-types/types";

describe("LIFO Queue tests", () => {

  it("runtime basics", () => {
    let q = createLifoQueue(1, 2, 3);
    q.push(1, 1, 1);
    expect(q.queue).toEqual([1, 2, 3, 1, 1, 1])
    const justOnes = q.take(3);
    expect(justOnes).toEqual([1, 1, 1]);
    expect(q.queue).toEqual([1, 2, 3]);

    let wq = createLifoQueue(...widen([1, 2, 3]))

    // @ts-ignore
    type cases = [
      Expect<Test<typeof q, "equals",  LifoQueue<1 | 2 | 3>>>,
      Expect<Test<typeof wq, "equals",  LifoQueue<number>>>
    ];

  });

});
