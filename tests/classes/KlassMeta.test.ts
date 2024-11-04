import { Equal, Expect } from "@type-challenges/utils";
import { KlassMeta } from "@inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("KlassMeta<T>", () => {
  class TestClass {
    public foo: number;
    public bar: string;

    constructor(foo: number, bar: string) {
      this.foo = foo;
      this.bar = bar;
    }
  }


  it("Happy Path", () => {
    type Inst = InstanceType<typeof TestClass>;
    type Params = ConstructorParameters<typeof TestClass>;
    type Meta = KlassMeta<typeof TestClass>;

    type cases = [
      Expect<Equal<Meta["params"], Params>>,
      Expect<Equal<Meta["instance"], Inst>>,
      Expect<Equal<Meta["class_decorators"], ClassDecoratorContext<typeof TestClass>>>,
      Expect<Equal<Meta["field_decorators"], ClassFieldDecoratorContext<typeof TestClass>>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });

});
