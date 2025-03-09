import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { ExtractCaptureGroups } from "inferred-types/types";

describe("ExtractCaptureGroups<T>", () => {

  it("first test", () => {
    type T1 = ExtractCaptureGroups<`^Name: {{string}}; Age: {{number}}$`>;
    type T2 = ExtractCaptureGroups<`.*(Name: {{string}}; Age: {{number}}).*`>;

    type cases = [
        Expect<Equal<T1, [string, number]>>,
        Expect<Equal<T2, [string, string, number]>>,
    ];
  });

});
