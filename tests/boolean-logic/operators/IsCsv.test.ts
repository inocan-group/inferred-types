import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { Expect, IsCsv, Test, Variable } from "inferred-types/types";

describe("IsCsv<T,[K]>", () => {

  it("happy path", () => {

    type T1 = IsCsv<"foo,bar, 4baz, 2ff,yup">;
    type T2 = IsCsv<"foo,">;
    type T3 = IsCsv<"foo,bar,">;

    type F1 = IsCsv<"foo,bar, 4baz, 2ff,yup", Variable>;
    type F2 = IsCsv<"">;
    type F3 = IsCsv<"foo,,bar">;

    type cases = [
        Expect<Test<T1, "equals", true>>,
        Expect<Test<T2, "equals", true>>,
        Expect<Test<T3, "equals", true>>,

        Expect<Test<F1, "equals", false>>,
        Expect<Test<F2, "equals", false>>,
        Expect<Test<F3, "equals", false>>,
    ];
  });

});
