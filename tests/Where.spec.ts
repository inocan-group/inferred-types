import { Expect, Equal } from "@type-challenges/utils";
import { Where, WhereNot } from "../src/types/Where";

describe("Where<T,U> and WhereNot<T,U> type utility", () => {

  it("readonly string array works correctly", () => {
    const arr = ["foo", "bar", "baz"] as const;
    type A = typeof arr;
    type B = Where<A, `ba${string}`>;
    type F = WhereNot<A, `ba${string}`>;

    type cases = [
      //
      Expect<Equal<B, "bar"| "baz">>,
      Expect<Equal<F, "foo">>
    ];
    
    const c: cases = [ true, true ];
    expect(c).toBe(c);
  });

  it("object with literal keys works", () => {
    const arr = {foo: true, bar: true, baz: true} as const;
    type A = typeof arr;
    type B = Where<A, `ba${string}`>;
    type F = WhereNot<A, `ba${string}`>;

    type cases = [
      //
      Expect<Equal<B, "bar"| "baz">>,
      Expect<Equal<F, "foo">>
    ];
    
    const c: cases = [ true, true ];
    expect(c).toBe(c);
  });


});
