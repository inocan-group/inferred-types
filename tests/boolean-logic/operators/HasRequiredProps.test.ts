/* eslint-disable ts/ban-ts-comment */
import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import {  EmptyObject, HasRequiredProps } from "inferred-types/types";
import { describe, it } from "vitest";

describe("HasRequiredProps<T>", () => {

  it("happy path", () => {
    type T1 = HasRequiredProps<{foo: 1; bar: 2}>;
    type T2 = HasRequiredProps<{foo: 1; bar?: 2}>;

    type F1 = HasRequiredProps<{foo?: 1; bar?: 2}>;
    type F2 = HasRequiredProps<EmptyObject>;

    type Wide = HasRequiredProps<Record<string, unknown>>;

    // @ts-ignore
    type _cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectFalse<F1>,
      ExpectFalse<F2>,
      Expect<Equal<Wide, boolean>>
    ];
  });

});
