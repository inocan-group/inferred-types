import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ExtractCaptureGroups, Test } from "inferred-types/types";

describe("ExtractCaptureGroups<T>", () => {

  it("first test", () => {
    type T1 = ExtractCaptureGroups<`^Name: {{string}}; Age: {{number}}$`>;
    type T2 = ExtractCaptureGroups<`.*(Name: {{string}}; Age: {{number}}).*`>;

    type cases = [
        Expect<Test<T1, "equals", [string,  number]>>,
        Expect<Test<T2, "equals", [string, string,  number]>>,
    ];
  });

});
