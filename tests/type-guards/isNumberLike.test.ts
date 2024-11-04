import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { IsNumberLike } from "@inferred-types/types"

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsNumberLike<T>", () => {

  it("happy path", () => {
    type T1 = IsNumberLike<42>;
    type T2 = IsNumberLike<"42">;
    type T3 = IsNumberLike<0>;
    type T4 = IsNumberLike<-1>;
    type T5 = IsNumberLike<"0">;
    type T6 = IsNumberLike<"-1">;

    type F1 = IsNumberLike<"32°">;
    type F2 = IsNumberLike<"a">;


    // @ts-ignore
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
    ];
  });

});
