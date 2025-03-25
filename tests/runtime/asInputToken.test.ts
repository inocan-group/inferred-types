import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { asType } from "inferred-types/runtime";
import { FromInputToken, FromInputTokenTuple } from "inferred-types/types";
import { Contains, Extends } from "inferred-types/types";

describe("FromInputToken<Token>", () => {


it("unions", () => {
      type U = FromInputToken<"number | String(bar)">;

      type cases = [
        Expect<Equal<U, number | "bar">>
      ];
    });

    it("tuple", () => {
      type T = FromInputTokenTuple<["number", "string", "true | Object"]>

      type cases = [
        Expect<Equal<T, [ number, string, true | object ]>>
      ];
    });
})


describe("asType(token)", () => {

  it("wide types", () => {
    const str = asType("string");
    const num = asType("number");
    const undef = asType("undefined");

    type cases = [
        Expect<Equal<typeof str, string>>,
        Expect<Equal<typeof num, number>>,
        Expect<Equal<typeof undef, undefined>>,
    ];
  });


  it("literal types", () => {
    const foo = asType("String(foo)");
    const num = asType("Number(42)");
    const yes = asType("Boolean(true)");

    type cases = [
        Expect<Equal<typeof foo, "foo">>,
        Expect<Equal<typeof num, 42>>,
        Expect<Equal<typeof yes, true>>,
    ];
  });



  it("union of wide types", () => {
    const strNum = asType("string | number ");
    const optStr = asType("string | undefined");

    expect(strNum).toEqual("<<'string | number'>>")

    type cases = [
        Expect<Equal<typeof strNum, string | number>>,
        Expect<Equal<typeof optStr, string | undefined>>,
    ];
  });


  it("union of mixed wide and narrow", () => {
    const strNum = asType("String(foo) | number");
    const optStr = asType("String(bar) | undefined");

    type cases = [
        Expect<Equal<typeof strNum, "foo" | number>>,
        Expect<Equal<typeof optStr, "bar" | undefined>>,
    ];
  });

  it("string literals (including template literals)", () => {
    const fooBar = asType("String(foo) | String(bar)");
    const foo42 = asType("String(foo) | Number(42)");
    const starting = asType("String(foo_{{string}})");
    const multi = asType("String({{number}} x {{number}})")

    type cases = [
        Expect<Equal<typeof fooBar, "foo" | "bar">>,
        Expect<Equal<typeof foo42, "foo" | 42>>,
        Expect<Equal<typeof starting, `foo_${string}`>>,
        Expect<Equal<typeof multi, `${number} x ${number}`>>,
    ];
  });


  it("different literal types", () => {
    const all = asType("Number(1) | Number(2) | Boolean(false)")

    type cases = [
      Expect<Equal<typeof all, 1 | 2 | false>>
    ];
  });

  it("object definition", () => {
    const fooBar = asType({foo: "string", bar: "number"});

    const fuzzy = asType({
        foo: "string | undefined",
        bar: "Array<boolean> | Boolean(false)"
    });

    const propError = asType({
        foo: "number",
        bar: "Array<number"
    });


    type cases = [
        Expect<Equal<typeof fooBar, { foo: string; bar: number}>>,
        Expect<Equal<typeof fuzzy, { foo: string | undefined; bar: false | boolean[]}>>,
        Expect<Extends<typeof propError, Error>>,
        Expect<Contains<typeof propError["message"], "problem with 'bar' key">>
    ];
  });

  it("array definition", () => {
    const strArr = asType("Array<string>");
    const fnArr = asType("Array<function>");
    const objArr = asType("Array<object>");
    const fooArr = asType("Array<String(foo)>");
    const unionArr = asType("Array<string | number>");
    const unionArr2 = asType("Array<string | undefined>");
    const unionArr3 = asType("Array<String(foo) | String(bar)>");

    type cases = [
        Expect<Equal<typeof strArr, string[]>>,
        Expect<Equal<typeof fnArr, ((...args: any[]) => any)[]>>,
        Expect<Equal<typeof objArr, object[]>>,
        Expect<Equal<typeof fooArr, "foo"[]>>,
        Expect<Equal<typeof unionArr, (string | number)[]>>,
        Expect<Equal<typeof unionArr2, (string | undefined)[]>>,
        Expect<Equal<typeof unionArr3, ("foo" | "bar")[]>>,
    ]
  });


  it("tuple definition", () => {
    const tup = asType("String(foo)", "Array<String(bar)>");
    const tup2 = asType("Number(1)", "Number(2)", "Number(3)");
    const tup3 = asType("Number(1) | Number(2)", "Number(3) | Number(4)");
    const tupObj = asType("string", {
        foo: "number",
        bar: "Number(1) | Number(2)"
    });

    type cases = [
        Expect<Equal<typeof tup, [ "foo", "bar"[]]>>,
        Expect<Equal<typeof tup2, [ 1,2,3 ]>>,
        Expect<Equal<typeof tup3, [ 1|2,3|4 ]>>,
        Expect<Equal<
            typeof tupObj,
            [string, {
                foo: number;
                bar: 1 | 2;
            }]
        >>
    ];
  });


  it("invalid tuple definition attempt", () => {
    const inv1 = asType(["String(foo)", "String(bar)"]);
    type E = typeof inv1;

    type cases = [
        Expect<Equal<E["type"], "invalid-token">>,
        Expect<Equal<E["subType"], "tuple">>,
    ];
  });




  it("Record<K,V>", () => {
    const obj = asType("Record<string, function>");
    const union = asType("Record<string, Object> | Record<string, number>")

    type cases = [
      Expect<Equal<typeof obj, Record<string, (...args: any[]) => any>>>,
      Expect<Equal<typeof union, Record<string, object> | Record<string, number>>>
    ];
  });

  it("Set definition", () => {
    const str = asType("Set<string>");
    const num = asType("Set<number>");
    const union = asType("Set<string | number>");

    type cases = [
        Expect<Equal<typeof str, Set<string>>>,
        Expect<Equal<typeof num, Set<number>>>,
        Expect<Equal<typeof union, Set<string | number>>>,
    ];
  });

  it("Map definition", () => {
    const str = asType("Map<string,string>");
    const num = asType("Map<number, object>");
    const union = asType("Map<string | number, Array<string>>");

    type cases = [
        Expect<Equal<typeof str, Map<string,string>>>,
        Expect<Equal<typeof num, Map<number, object>>>,
        Expect<Equal<typeof union, Map<string | number, string[]>>>,
    ];
  });


});
