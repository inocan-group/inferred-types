import { describe, it, expect } from "vitest";
import { isNestingKeyValue, nesting } from "inferred-types/runtime";
import type { AsNestingConfig, Expect, Test } from "inferred-types/types";

describe("nesting() HOF", () => {

    describe("Named Configurations", () => {
        it("'brackets' config works correctly", () => {
            const api = nesting("brackets");

            const split1 = api.split("a,b[c,d],e", ",");
            expect(split1).toEqual(["a", "b[c,d]", "e"]);

            const retain1 = api.retainUntil("foo{bar}baz", "}");
            expect(retain1).toBe("foo{bar}");

            type Split1 = typeof split1;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "b[c,d]", "e"]>>
            ];
        });

        it("'quotes' config works correctly", () => {
            const api = nesting("quotes");

            const split1 = api.split("a,\"b,c\",d", ",");
            expect(split1).toEqual(["a", "\"b,c\"", "d"]);

            // retainUntil finds the first occurrence at root level (not nested)
            const retain1 = api.retainUntil("foo'bar'baz", "z");
            expect(retain1).toBe("foo'bar'baz");

            type Split1 = typeof split1;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "\"b,c\"", "d"]>>
            ];
        });

        it("'brackets-and-quotes' config works correctly", () => {
            const api = nesting("brackets-and-quotes");

            const split1 = api.split("a,\"b,c\",d(e,f),g", ",");
            expect(split1).toEqual(["a", "\"b,c\"", "d(e,f)", "g"]);

            const retain1 = api.retainUntil("foo(bar\"baz\")qux", ")");
            expect(retain1).toBe("foo(bar\"baz\")");

            type Split1 = typeof split1;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "\"b,c\"", "d(e,f)", "g"]>>
            ];
        });


    });

    describe.skip("Named Configurations (new syntax)", () => {

        it("'shallow-brackets' config works correctly", () => {
            const api = nesting("shallow-brackets");

            // Should NOT split inside brackets
            const split1 = api.split("a,b(c,d),e", ",");
            expect(split1).toEqual(["a", "b(c,d)", "e"]);

            // Should retain until bracket, ignoring nested content
            const retain1 = api.retainUntil("foo(bar[baz])qux", ")");
            expect(retain1).toBe("foo(bar[baz])");

            type Split1 = typeof split1;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "b(c,d)", "e"]>>
            ];
        });

        it("'shallow-quotes' config works correctly", () => {
            const api = nesting("shallow-quotes");

            // Should NOT split inside quotes
            const split1 = api.split("a,\"b,c\",d", ",");
            expect(split1).toEqual(["a", "\"b,c\"", "d"]);

            // Single quotes work too
            const split2 = api.split("a,'b,c',d", ",");
            expect(split2).toEqual(["a", "'b,c'", "d"]);

            // Should retain until character at root level
            const retain1 = api.retainUntil("foo\"bar'baz'\"qux", "q");
            expect(retain1).toBe("foo\"bar'baz'\"q");

            type Split1 = typeof split1;
            type Split2 = typeof split2;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "\"b,c\"", "d"]>>,
                Expect<Test<Split2, "equals", ["a", "'b,c'", "d"]>>
            ];
        });

        it("'shallow-brackets-and-quotes' config works correctly", () => {
            const api = nesting("shallow-brackets-and-quotes");

            // Should NOT split inside brackets or quotes
            const split1 = api.split("a,\"b,c\",d(e,f),g", ",");
            expect(split1).toEqual(["a", "\"b,c\"", "d(e,f)", "g"]);

            // Mixed nesting should work
            const split2 = api.split("a,'b(c,d)',e", ",");
            expect(split2).toEqual(["a", "'b(c,d)'", "e"]);

            // Should retain until bracket or quote
            const retain1 = api.retainUntil("foo(bar\"baz\")qux", ")");
            expect(retain1).toBe("foo(bar\"baz\")");

            type Split1 = typeof split1;
            type Split2 = typeof split2;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "\"b,c\"", "d(e,f)", "g"]>>,
                Expect<Test<Split2, "equals", ["a", "'b(c,d)'", "e"]>>
            ];
        });

    })

    describe("Custom Configurations", () => {

        it("accepts custom NestingKeyValue config", () => {
            const valid = isNestingKeyValue({ "<": ">" });

            expect(valid).toBe(true);

            const api = nesting({ "<": ">" });

            const split1 = api.split("a,b<c,d>,e", ",");
            expect(split1).toEqual(["a", "b<c,d>", "e"]);

            const retain1 = api.retainUntil("foo<bar>baz", ">");
            expect(retain1).toBe("foo<bar>");

            type Split1 = typeof split1;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "b<c,d>", "e"]>>
            ];
        });

        it("accepts custom NestingTuple config", () => {
            const api = nesting([["<"], [">"]]);

            const split1 = api.split("a,b<c,d>,e", ",");
            expect(split1).toEqual(["a", "b<c,d>", "e"]);

            type Split1 = typeof split1;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "b<c,d>", "e"]>>
            ];
        });


    });

    describe.skip("Custom Configurations (with new syntax)", () => {

        it("accepts hierarchical NestingTuple config", () => {
            const api = nesting([
                ["(", "["],
                { exit: [")", "]"], children: {} }, // Empty config for next level (shallow)
            ]);

            const split1 = api.split("a,(b,c),d", ",");
            expect(split1).toEqual(["a", "(b,c)", "d"]);

            const split2 = api.split("a,[b,c],d", ",");
            expect(split2).toEqual(["a", "[b,c]", "d"]);

            type Split1 = typeof split1;
            type Split2 = typeof split2;
            type cases = [
                Expect<Test<Split1, "equals", ["a", "(b,c)", "d"]>>,
                Expect<Test<Split2, "equals", ["a", "[b,c]", "d"]>>
            ];
        });

    })

    describe("API Surface", () => {

        it("split() method has correct signature", () => {
            const api = nesting("brackets");

            // Basic split
            const r1 = api.split("a,b,c", ",");
            expect(r1).toEqual(["a", "b", "c"]);

            // With policy - omit (default)
            const r2 = api.split("a,b,c", ",", "omit");
            expect(r2).toEqual(["a", "b", "c"]);

            type R1 = typeof r1;
            type R2 = typeof r2;
            type cases = [
                Expect<Test<R1, "equals", ["a", "b", "c"]>>,
                Expect<Test<R2, "equals", ["a", "b", "c"]>>
            ];
        });

        it("retainUntil() method has correct signature", () => {
            const api = nesting("brackets");

            // With include (default true)
            const r1 = api.retainUntil("foo(bar)baz", ")");
            expect(r1).toBe("foo(bar)");

            // With include = false
            const r2 = api.retainUntil("foo(bar)baz", ")", false);
            expect(r2).toBe("foo(bar");

            // With include = true (explicit)
            const r3 = api.retainUntil("foo(bar)baz", "z", true);
            expect(r3).toBe("foo(bar)baz");

            type R1 = typeof r1;
            type R2 = typeof r2;
            type R3 = typeof r3;
            type cases = [
                Expect<Test<R1, "equals", "foo(bar)">>,
                Expect<Test<R2, "equals", "foo(bar">>,
                Expect<Test<R3, "equals", "foo(bar)baz">>
            ];
        });
    });

    describe("Error Handling", () => {

        it("returns error for invalid named config", () => {
            // @ts-expect-error - testing runtime error
            expect(nesting("invalid-config")).toBeInstanceOf(Error);
        });

        it("returns error for invalid custom config", () => {
            // @ts-expect-error - testing runtime error
            const result = nesting({ invalid: 123 });
            expect(result).toHaveProperty("type", "invalid-nesting-config");
        });
    });
});
