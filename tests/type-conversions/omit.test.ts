import { describe, it, expect } from "vitest";
import { omit } from "src/runtime";
import { Expect, Equal, ExpectExtends, NotAny } from "@type-challenges/utils";
describe("omit", () => {

  it("runtime object is reduced by stated props", () => {
    const begin = { foo: 1, bar: 2, baz: 3 };
    const end = omit(begin, "foo", "bar");
    expect(Object.keys(end).length).toEqual(1);
    expect(Object.keys(end).includes("foo")).toEqual(false);
    expect(Object.keys(end).includes("bar")).toEqual(false);
    expect(Object.keys(end).includes("baz")).toEqual(true);
  
    const end2 = omit(begin, "bar");
    expect(Object.keys(end2).includes("foo")).toEqual(true);
    expect(Object.keys(end2).includes("bar")).toEqual(false);
    expect(Object.keys(end2).includes("baz")).toEqual(true);
  
    const end3 = omit(begin);
    expect(Object.keys(end3).includes("foo")).toEqual(true);
    expect(Object.keys(end3).includes("bar")).toEqual(true);
    expect(Object.keys(end3).includes("baz")).toEqual(true);
  
    const end4 = omit(begin, "foo", "bar", "baz");
    expect(Object.keys(end4).includes("foo")).toEqual(false);
    expect(Object.keys(end4).includes("bar")).toEqual(false);
    expect(Object.keys(end4).includes("baz")).toEqual(false);
  });
  
  it("type system is reduced by stated props", () => {
    const begin = { foo: 1, bar: 2, baz: 3 };
    const end = omit(begin, "foo", "bar");
    type End = typeof end;
    type cases = [
      Expect<Equal<End["baz"], number>>,
      Expect<ExpectExtends<End, { baz: number }>>,
      Expect<NotAny<ExpectExtends<End, { foo: number }>>>,
      Expect<NotAny<ExpectExtends<End, { bar: number }>>>
    ];
    const c: cases = [true, true, true, true];
    expect(c).toEqual(c);
  
    const end2 = omit(begin, "bar");
    type End2 = typeof end2;
    type cases2 = [
      Expect<Equal<End2["baz"], number>>,
      Expect<Equal<End2["foo"], number>>,
      Expect<NotAny<ExpectExtends<End2, { bar: number }>>>
    ];
    const c2: cases2 = [true, true, true];
    expect(c2).toEqual(c2);
  });
  
  it("", () => {
    type Shape = {
      foo: number;
      bar: { id: number; name: "bar" };
    } & { baz: { id: number; name: "baz" } };
  
    const obj: Shape = {
      foo: 45,
      bar: { id: 1, name: "bar" },
      baz: { id: 2, name: "baz" },
    };
  
    omit(obj, "baz");
    const excluded = ["foo", "bar"] as const;
    omit(obj, ...excluded);
  });

});

