import { describe, expect, it } from "vitest";
import { Expect, Dictionary, SimpleType, Test } from "inferred-types/types";
import { simpleType } from "inferred-types/runtime";



describe("SimpleType<T>", () => {

  it("happy path", () => {
    type Str = SimpleType<"string">;
    type Num = SimpleType<"number">;
    type Bool = SimpleType<"boolean">;
    type True = SimpleType<"true">;
    type False = SimpleType<"false">;
    type Null = SimpleType<"null">;

    type cases = [
      Expect<Test<Str, "equals",  string>>,
      Expect<Test<Num, "equals",  number>>,
      Expect<Test<Bool, "equals",  boolean>>,
      Expect<Test<True, "equals",  true>>,
      Expect<Test<False, "equals",  false>>,
      Expect<Test<Null, "equals",  null>>,
    ];
  });

  it("String and Numeric literals", () => {
    type Answer = SimpleType<"string(42)">;
    type Answer2 = SimpleType<"number(42)">;

    type FooBar = SimpleType<"string(foo,bar)">;
    type OneTwo = SimpleType<"number(1,2)">;

    type cases = [
      Expect<Test<Answer, "equals",  "42">>, //
      Expect<Test<Answer2, "equals",  42>>, //
      Expect<Test<FooBar, "equals",  "foo" | "bar">>, //
      Expect<Test<OneTwo, "equals",  1 | 2>>, //
    ];
  })

  it("optional types", () => {
    type Str = SimpleType<"Opt<string>">;
    type Num = SimpleType<"Opt<number>">;
    type Bool = SimpleType<"Opt<boolean>">;

    type cases = [
      Expect<Test<Str, "equals",  string | undefined>>,
      Expect<Test<Num, "equals",  number | undefined>>,
      Expect<Test<Bool, "equals",  boolean | undefined>>,
    ];
  });

  it("Dictionaries", () => {
    type D1 = SimpleType<"Dict">;
    type DId = SimpleType<"Dict<{id: number}>">;
    type DFoo = SimpleType<"Dict<{foo: number}>">;
    type DFooBar = SimpleType<"Dict<{foo: string, bar: Opt<boolean>}>">;

    type cases = [
      Expect<Test<D1, "equals",  Dictionary>>,
      Expect<Test<DId, "equals",  { id: number;[key: string | symbol]: any }>>,
      Expect<Test<DFoo, "equals",  { foo: number;[key: string | symbol]: any }>>,
      Expect<Test<DFooBar, "equals",  { foo: string; bar: boolean | undefined;[key: string | symbol]: any }>>,
    ];
  });


  it("Set, Map, and WeakMap", () => {
    type S1 = SimpleType<"Set">
    type S2 = SimpleType<"Set<string>">;
    type S3 = SimpleType<"Set<number>">;

    type M1 = SimpleType<"Map">;
    type M2 = SimpleType<"Map<number, string>">;
    type M3 = SimpleType<"Map<Dict, Dict<string, Opt<number>>>">;

    type cases = [
      Expect<Test<S1, "equals", Set<any>>>,
      Expect<Test<S2, "equals", Set<string>>>,
      Expect<Test<S3, "equals", Set<number>>>,

      Expect<Test<M1, "equals", Map<any, any>>>,
      Expect<Test<M2, "equals", Map<number, string>>>,
      Expect<Test<
        M3,
        "equals",
        Map<Dictionary, Dictionary<string, number | undefined>>
      >>,
    ];
  });
});


describe("simpleType()", () => {

  it("happy path", () => {
    const str = simpleType("string");
    const num = simpleType("number");
    const bool = simpleType("boolean");

    expect(str).toBe("string")
    expect(num).toBe("number")
    expect(bool).toBe("boolean")

    type cases = [
      Expect<Test<typeof str, "equals",  string>>,
      Expect<Test<typeof num, "equals",  number>>,
      Expect<Test<typeof bool, "equals",  boolean>>,
    ];
  });


  it("literals", () => {
    const strLit = simpleType("string(foo)");
    const strUnion = simpleType("string(foo,bar)")

    expect(strLit).toBe("string(foo)");
    expect(strUnion).toBe("string(foo,bar)");

    type cases = [
      Expect<Test<typeof strLit, "equals",  "foo">>,
      Expect<Test<typeof strUnion, "equals",  "foo" | "bar">>,
    ];
  });


});
