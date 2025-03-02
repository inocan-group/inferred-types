import { Equal, Expect } from "@type-challenges/utils";
import { asType } from "inferred-types/runtime";
import { Contains, Extends } from "transpiled/types";
import { describe, it } from "vitest";

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


  it("union of wide types", () => {
    const strNum = asType("string | number");
    const optStr = asType("string | undefined");

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
        Expect<Contains<typeof propError["message"], "The token 'Array<number' is not a valid input">>
    ];
  });

  it("array definition", () => {
    const strArr = asType("Array<string>");
    const fnArr = asType("Array<function>");
    const objArr = asType("Array<object>");
    const unionArr = asType("Array<string | number>");
    const unionArr2 = asType("Array<string | undefined>");
    const unionArr3 = asType("Array<String(foo) | String(bar)>");

    type cases = [
        Expect<Equal<typeof strArr, string[]>>,
        Expect<Equal<typeof fnArr, ((...args: any[]) => any)[]>>,
        Expect<Equal<typeof objArr, Object[]>>,
        Expect<Equal<typeof unionArr, (string | number)[]>>,
        Expect<Equal<typeof unionArr2, (string | undefined)[]>>,
        Expect<Equal<typeof unionArr3, ("foo" | "bar")[]>>,
    ]
  })


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
        Expect<Equal<typeof num, Map<number, Object>>>,
        Expect<Equal<typeof union, Map<string | number, string[]>>>,
    ];
  });


});
