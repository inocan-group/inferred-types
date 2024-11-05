import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { Ref } from "vue";
import { IsValidDotPath,  ValueAtDotPath } from "inferred-types";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("ValueAtDotPath", () => {

  it("happy path", () => {
    type myRef = Ref<{ age: number; address: string }>;
    type Obj = {
      foo: 1;
      bar: number[];
      baz: {
        a: string;
        b: string;
        c: {
          ca: 1;
          cb: 2;
          cc: string[];
        };
      };
      color: [number, string, number];
      info: myRef;
    };

    type Valid = IsValidDotPath<Obj, "foo">;

    type Foo = ValueAtDotPath<Obj, "foo">;
    type Bar = ValueAtDotPath<Obj, "bar">;
    type Baz_c_ca = ValueAtDotPath<Obj, "baz.c.ca">;
    type ExplicitInfo = ValueAtDotPath<Obj, "info.value.age">;
    type ImplicitInfo = ValueAtDotPath<Obj, "info.age">;

    type cases = [
      ExpectTrue<Valid>,
      Expect<Equal<Foo, 1>>,
      Expect<Equal<Bar, number[]>>,
      Expect<Equal<Baz_c_ca, 1>>,

      Expect<Equal<ExplicitInfo, number>>,
      Expect<Equal<ImplicitInfo, number>>,

    ];
    const cases: cases = [
      true, true, true, true,
      true, true
    ];
  });


});
