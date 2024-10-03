import { Equal, Expect } from "@type-challenges/utils";
import { DefineObject, DictTypeDefinition, FromDefn, TypeDefinition } from "src/types/index";
import { describe, it } from "vitest";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("FromDefn<T>", () => {

  it("happy path", () => {
    // pass through
    type Num = FromDefn<42>;
    type ArrNum = FromDefn<[42,56]>;
    type Obj = FromDefn<{foo: 1}>;

    // definitions
    const fn = <
      V extends TypeDefinition,
      T extends readonly (TypeDefinition | DictTypeDefinition<V>)[],
    >(...s: T) => s;

    const objDefn = fn({foo: s => s.string("foo","bar"), bar: 42});
    type ObjDefn = FromDefn<typeof objDefn>;


    type cases = [
      Expect<Equal<Num, 42>>,
      Expect<Equal<ArrNum, [42,56]>>,
      Expect<Equal<Obj, {foo: 1}>>,

      Expect<Equal<ObjDefn, [{foo: "foo" | "bar"; bar: 42}]>>,

    ];
    const cases: cases = [
      true, true, true,
      true
    ];
  });


  it("using SimpleTokens for definition", () => {
    type Num = FromDefn<"number">;
    type Union = FromDefn<"number(4,5,6)">;


    // @ts-ignore
    type cases = [
      Expect<Equal<Num, number>>,
      Expect<Equal<Union, 4 | 5 | 6>>,
    ];

  });


  it("using Shape callbacks for definition", () => {
    const cb = <T extends DefineObject>(defn: T) => defn as unknown as FromDefn<T>;

    const a = cb({
      foo: o => o.string("foo","bar","baz"),
      bar: o => o.string().militaryTime(),
      baz: "Opt<number>"
    });




    // @ts-ignore
    type cases = [
      /** type tests */
    ];

  });



});
