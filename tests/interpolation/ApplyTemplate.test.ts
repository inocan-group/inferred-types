import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import type { ApplyTemplate, Test } from "inferred-types/types";

describe("ApplyTemplate<TContent,TTemplate>", () => {

    it("happy path", () => {
        type Actual = `Age: 42, Weight: 190, Name: Bob, Employed: true`
        type Template = `Age: {{number}}, Weight: {{number}}, Name: {{string}}, Employed: {{boolean}}`

        type Applied = ApplyTemplate<Actual, Template>;
        type Applied2 = ApplyTemplate<Actual, Template, false>;

        type cases = [
            Expect<Test<Applied, "equals",[Actual, "42","190","Bob",   "true"]>>,
            Expect<Test<Applied2,"equals", [Actual, 42, 190, "Bob",   true]>>,
        ];
    });

    it("changed order with boolean not terminal position", () => {
        type Actual = `Age: 42, Weight: 190, Employed: true, Name: Bob`
        type Template = `Age: {{number}}, Weight: {{number}}, Employed: {{boolean}}, Name: {{string}}`

        type Applied = ApplyTemplate<Actual, Template>;
        type Applied2 = ApplyTemplate<Actual, Template, false>;

        type cases = [
            Expect<Test<Applied,"equals",  [Actual, "42","190","true",  "Bob"]>>,
            Expect<Test<Applied2, "equals",[Actual, 42, 190, true,   "Bob"]>>,
        ];
    });

    it("tailing content", () => {
        type Actual = `Age: 42, Weight: 190, Name: Bob, Employed: true. That's all.`
        type Template = `Age: {{number}}, Weight: {{number}}, Name: {{string}}, Employed: {{boolean}}.{{string}}`

        type Applied = ApplyTemplate<Actual, Template>;
        type Applied2 = ApplyTemplate<Actual, Template, false>;

        type cases = [
            Expect<Test<Applied, "equals",[Actual, "42","190","Bob", "true",   " That's all."]>>,
            Expect<Test<Applied2,"equals",  [Actual, 42, 190, "Bob", true,  " That's all."]>>,
        ];
    });

});
