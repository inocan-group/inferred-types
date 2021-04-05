import { idLiteral } from "~/literal";
import { Equal, NotEqual, Expect } from "@type-challenges/utils";

describe("literal enforcement", () => {
  it("idLiteral forces 'id' to literal number", () => {
    const t1 = { id: 1, message: "t1" };
    const t2 = { id: 2, message: "t2" };
    type T1 = typeof t1.id;
    type T2 = typeof t2.id;

    const l1 = idLiteral({ id: 1, message: "t1" });
    const l2 = idLiteral({ id: 2, message: "t2" });
    type L1 = typeof l1.id;
    type L2 = typeof l2.id;

    expect(typeof l1.id).toBe("number"); // run time type of "number"
    expect(typeof l2.id).toBe("number"); // run time type of "number"

    type cases = [
      Expect<Equal<T1, T2>>, // without using explicit cast to literal, TS sees as equivalent
      Expect<NotEqual<L1, L2>>, // TS types, are literals and therefore not equal
      Expect<NotEqual<L1, number>>,
      Expect<NotEqual<L2, number>>
    ];
    const typeTests: cases = [true, true, true, true];
    expect(typeTests).toBe(typeTests);
  });

  it("An array records from idLiteral() is typed as an array of 'id' literals", () => {
    const l1 = idLiteral({ id: 1, message: "t1" });
    const l2 = idLiteral({ id: 2, message: "t2" });
    const arr = [l1, l2];
    type L1 = typeof arr[0]["id"];
    type L2 = typeof arr[1]["id"];
    type NonIndexedId = 3;

    // run-time type is obviously maintained
    arr.forEach((item) => expect(typeof item.id).toBe("number"));

    // real test is literals being accumulated rather than being widened up to "number"
    type cases = [
      Expect<Equal<L1, L2>>,
      Expect<NotEqual<L1, NonIndexedId>>,
      Expect<NotEqual<L1, number>>,
      Expect<NotEqual<L2, number>>
    ];
    const typeTests: cases = [true, true, true, true];
    expect(typeTests).toBe(typeTests);
  });
});
