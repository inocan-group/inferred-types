import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IsCsv, Variable } from "inferred-types/types";

describe("IsCsv<T,[K]>", () => {

  it("happy path", () => {

    type T1 = IsCsv<"foo,bar, 4baz, 2ff,yup">;
    type T2 = IsCsv<"foo,">;
    type T3 = IsCsv<"foo,bar,">;


    type F1 = IsCsv<"foo,bar, 4baz, 2ff,yup", Variable>;
    type F2 = IsCsv<"">;
    type F3 = IsCsv<"foo,,bar">;


    // @ts-ignore
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,


      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });

});
