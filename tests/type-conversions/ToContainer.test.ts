
import { Equal, Expect } from "@type-challenges/utils";
import { AnyArray, AnyObject, Scalar, ToContainer } from "inferred-types/types";
import { describe, it } from "vitest";


describe("ToContainer<T>", () => {

  it("first test", () => {
    type Fn = () => "hi";
    type Obj = { foo: string; bar: string };
    type RoArr = readonly [1, 2, 3];
    type Arr = [1, 2, 3];
    type Never = AnyObject | AnyArray;

    type ScalarOrObject = ToContainer<Scalar | Obj>;
    type JustScalar = ToContainer<Scalar>;
    type FnOrObj = ToContainer<Fn | Obj>;
    type FnScalarAndObj = ToContainer<Scalar | Obj | Fn>;
    type RoArrScalar = ToContainer<RoArr | Scalar>;
    type ArrScalar = ToContainer<Arr | Scalar>;

    type Unknown = ToContainer<unknown>;
    type Any = ToContainer<any>;

    type cases = [
      Expect<Test<ScalarOrObject, "equals",  Obj>>,
      Expect<Test<JustScalar, "equals",  Never>>,
      Expect<Test<FnOrObj, "equals",  Obj>>,
      Expect<Test<FnScalarAndObj, "equals",  Obj>>,
      Expect<Test<RoArrScalar, "equals",  RoArr>>,
      Expect<Test<ArrScalar, "equals",  Arr>>,

      Expect<Test<Unknown, "equals",  [unknown]>>,
      Expect<Test<Any, "equals",  [any]>>,
    ];
    const cases: cases = [true, true, true, true, true, true, true, true];
  });

});
