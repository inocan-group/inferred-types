
import { describe, it } from "vitest";
import type { Expect, ReverseLookup, Test } from "inferred-types/types";

describe("ReverseLookup<T>", () => {

    it("happy path", () => {
        type T1 = ReverseLookup<{ foo: "1"; bar: "bax" }>

        type cases = [
            Expect<Test<T1, "equals",  { "1": "foo"; bax: "bar" }>>
        ];
    });

    it("preserves exact type narrowing", () => {
        type SimpleMapping = {
            foo: "bar";
            baz: "qux";
            hello: "world";
        };

        type Reversed = ReverseLookup<SimpleMapping>;

        // Test exact type narrowing
        type cases = [
            Expect<Test<Reversed["bar"], "equals", "foo">>,
            Expect<Test<Reversed["qux"], "equals", "baz">>,
            Expect<Test<Reversed["world"], "equals", "hello">>
        ];
    });

    it("JS to HTML", () => {
        type LargeMapping = {
            ["<"]: "<";
            [">"]: ">";
            ["'"]: "'";
            ["\u00A0"]: "&nbsp;";
            ["\u2003"]: "&emsp;";
            ["\u2002"]: "&ensp;";
            ["\u2009"]: "&thinsp;";
            ["©"]: "&copy;";
            ["®"]: "&reg;";
            ["™"]: "&trade;";
            ["€"]: "&euro;";
            ["£"]: "&pound;";
            ["¥"]: "&yen;";
            ["¢"]: "&cent;";
            ["§"]: "&sect;";
            ["¶"]: "&para;";
            ["•"]: "&bull;";
            ["…"]: "&hellip;";
            ["°"]: "&deg;";
            ["±"]: "&plusmn;";
            ["÷"]: "&divide;";
            ["×"]: "&times;";
            ["¼"]: "&frac14;";
            ["½"]: "&frac12;";
            ["¾"]: "&frac34;";
            ["∞"]: "&infin;";
            ["∑"]: "&sum;";
            ["∏"]: "&prod;";
            ["∫"]: "&int;";
            ["√"]: "&radic;";
            ["∂"]: "&part;";
            ["≈"]: "&asymp;";
            ["≠"]: "&ne;";
            ["≡"]: "&equiv;";
            ["≤"]: "&le;";
            ["≥"]: "&ge;";
            ["∧"]: "&and;";
            ["¬"]: "&not;";
            ["←"]: "&larr;";
            ["→"]: "&rarr;";
            ["↑"]: "&uarr;";
            ["↓"]: "&darr;";
            ["α"]: "&alpha;";
            ["β"]: "&beta;";
            ["γ"]: "&gamma;";
            ["δ"]: "&delta;";
            ["ε"]: "&epsilon;";
            ["ζ"]: "&zeta;";
            ["η"]: "&eta;";
            ["θ"]: "&theta;";
            ["ι"]: "&iota;";
            ["κ"]: "&kappa;";
            ["λ"]: "&lambda;";
            ["μ"]: "&mu;";
            ["ν"]: "&nu;";
            ["ξ"]: "&xi;";
            ["ο"]: "&omicron;";
            ["π"]: "&pi;";
            ["ρ"]: "&rho;";
            ["σ"]: "&sigma;";
            ["τ"]: "&tau;";
            ["υ"]: "&upsilon;";
            ["φ"]: "&phi;";
            ["χ"]: "&chi;";
            ["ψ"]: "&psi;";
            ["ω"]: "&omega;";
        };
        type Reverse = ReverseLookup<LargeMapping>;

        type cases = [
            Expect<Test<Reverse["&copy;"], "equals",  "©">>
        ];
    });

    it("handles edge cases correctly", () => {
        type EdgeCases = {
            "": "empty";
            " ": "space";
            "\n": "newline";
            "\t": "tab";
        };

        type Reversed = ReverseLookup<EdgeCases>;

        type cases = [
            Expect<Test<Reversed["empty"], "equals", "">>,
            Expect<Test<Reversed["space"], "equals", " ">>,
            Expect<Test<Reversed["newline"], "equals", "\n">>,
            Expect<Test<Reversed["tab"], "equals", "\t">>
        ];
    });

    it("works with numeric keys and values", () => {
        type NumericMapping = {
            1: "one";
            2: "two";
            3: "three";
        };

        type Reversed = ReverseLookup<NumericMapping>;

        type cases = [
            Expect<Test<Reversed["one"], "equals", 1>>,
            Expect<Test<Reversed["two"], "equals", 2>>,
            Expect<Test<Reversed["three"], "equals", 3>>
        ];
    });

    it("handles single key-value pairs", () => {
        type Single = {
            key: "value";
        };

        type Reversed = ReverseLookup<Single>;

        type cases = [
            Expect<Test<Reversed["value"], "equals", "key">>
        ];
    });

    it("handles empty object correctly", () => {
        type Empty = {};
        type Reversed = ReverseLookup<Empty>;

        type cases = [
            Expect<Test<keyof Reversed, "equals", never>>
        ];
    });

});
