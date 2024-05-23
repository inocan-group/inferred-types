import { Equal, Expect } from "@type-challenges/utils";
import { DictTypeDefinition, FromDefn, TypeDefinition } from "src/types/index";
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
      T extends readonly (TypeDefinition | DictTypeDefinition<V>)[],
      V extends TypeDefinition
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

});
