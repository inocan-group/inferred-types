import { idLiteral, literal } from "~/utility";
import { Equal, NotEqual, Expect, ExpectExtends, ExpectFalse } from "@type-challenges/utils";

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

    // run-time type is maintained
    for (const item of arr) {
      expect(typeof item.id).toBe("number");
    }

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

  it("literal() creates narrow type definitions for all props on passed in object", () => {
    /** by default you get a wide definition of types */
    const wide = { foo: 1, bar: false, baz: "hi" };
    type Wide = typeof wide;
    /** but with the literal function we can force this to narrow */
    const narrow = literal({ foo: 1, bar: false, baz: "hi" });
    type Narrow = typeof narrow;
    /** 
     * would be nice if this worked but it doesn't; once the type is set, it's set 
     */
    const nope = literal(wide);
    type Nope = typeof nope;

    type cases = [
      Expect<Equal<Wide, { foo: number; bar: boolean; baz: string }>>,
      Expect<Equal<Narrow, { foo: 1; bar: false; baz: "hi" }>>,
      // Narrow _does_ extend the Wide definition
      Expect<ExpectExtends<Wide, Narrow>>,
      // but the opposite is not true
      ExpectFalse<ExpectExtends<Narrow, Wide>>,
      // now unfortunately, using literal() on a variable who's type
      // has already been inferred does not get us to Narrow
      Expect<Equal<Wide, Nope>>
    ];
    const cases: cases = [true, true, true, false, true];
    expect(cases).toBe(cases);
  });
});
