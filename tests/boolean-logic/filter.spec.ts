import { describe } from "vitest";


describe.skip("filter() utility function", () => {
  // it("string filter built and gives proper types", () => {
  //   const f = createFilter({ startsWith: "th" });
  //   type P = Parameters<typeof f>;
  //   type R = ReturnType<typeof f>;
  //   const notPrivate = createFilter({ not: { startsWith: ["_", "."] } });

  //   // runtime
  //   expect(typeof f).toEqual("function");
  //   expect(["one", "two", "three"].filter(f)).toEqual(["three"]);
  //   expect(["foo.md", "bar.html", "_private.md", ".bobs-your-uncle.txt"].filter(notPrivate)) //
  //     .toEqual(["foo.md", "bar.html"]);

  //   // design time
  //   type cases = [
  //     Expect<Equal<P[0], string | undefined>>, //
  //     Expect<Equal<R, boolean>>
  //   ];
  //   const cases: cases = [true, true];
  // });

  // it("numeric filter built and gives proper types", () => {
  //   const f = createFilter({ equals: 42 });
  //   type P = Parameters<typeof f>;
  //   type R = ReturnType<typeof f>;

  //   // runtime
  //   expect(typeof f).toEqual("function");
  //   expect([1, 2, 3, 4, 5].filter(createFilter({ greaterThan: 3 }))) //
  //     .toEqual([4, 5]);
  //   expect([1, 2, 3, 4, 5].filter(createFilter({ not: { greaterThan: 3 } }))) //
  //     .toEqual([1, 2, 3]);

  //   // design time
  //   type cases = [
  //     Expect<Equal<P[0], number | undefined>>, //
  //     Expect<Equal<R, boolean>>
  //   ];
  //   const cases: cases = [true, true];
  // });

  // it("string filter's startsWith", () => {
  //   const f = createFilter({ startsWith: "." });
  //   const remaining = ["foo", "bar", ".baz"].filter(f);

  //   expect(remaining).toEqual([".baz"]);
  // });

  
  // // TODO: this needs to be reworked and there is a start with f2 
  // it.skip("combining positive search condition with negative", () => {
  //   const f1 = createFilter({ startsWith: "b", not: {equals: ["bar", "banana"]}}, "AND");
  //   const f2 = createFilter({ startsWith: "b", notEqual: ["bar", "banana"]}, "AND");
  //   const values = ["foo", "bar", "baz", "banana"] as const;
  //   expect(f1("foo")).toBe(false);
  //   expect(f1("bar")).toBe(false);
  //   expect(f2("bar")).toBe(false);
  //   expect(f1("baz")).toBe(true);
  //   const r1 = values.filter(f1);
  //   const r2 = values.filter(f2);
  //   expect(r1).toEqual(["baz"]);
  //   expect(r2).toEqual(["baz"]);
  
  // });
  
});
