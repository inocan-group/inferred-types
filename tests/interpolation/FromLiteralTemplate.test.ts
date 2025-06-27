import {
    Expect,
    Test,
    FromLiteralTemplate
} from "inferred-types/types";
import { describe, it } from "vitest";

describe("FromLiteralTemplate<T>", () => {

  it("happy path", () => {
    type T1 = FromLiteralTemplate<`${string}fooBar: ${number}, fooBaz: ${boolean}`>

    type cases = [
      Expect<Test<T1, `{{string}}fooBar: {{number}}, "equals",  fooBaz: {{boolean}}`>>
    ];
  });

});
