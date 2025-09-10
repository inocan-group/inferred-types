import { describe, it, expect } from "vitest";
import { it_takeArray, it_takeArray__Bracket } from "inferred-types/runtime";
import { isErr } from "inferred-types/runtime";
import type { IT_Token, Expect, Test, IT_TakeArray } from "inferred-types/types";

describe("it_takeArray", () => {

    it("postfix arrays", () => {
        const result1 = it_takeArray("string[]");
        const result2 = it_takeArray("number[][]");
        const result3 = it_takeArray("boolean[] | string");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("array");
            expect(result1.token).toBe("string[]");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("array");
            expect(result2.token).toBe("number[]");
            expect(result2.rest).toBe("[]");
        }

        if (!isErr(result3)) {
            expect(result3.kind).toBe("array");
            expect(result3.token).toBe("boolean[]");
            expect(result3.rest).toBe("| string");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result3, "extends", IT_Token<"array">>>,
        ];
    });

    it("postfix grouped arrays", () => {
        const result1 = it_takeArray("(string)[]");
        const result2 = it_takeArray("(string | number)[]");
        const result3 = it_takeArray("(boolean)[] | string");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("array");
            expect(result1.token).toBe("(string)[]");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("array");
            expect(result2.token).toBe("(string | number)[]");
            expect(result2.rest).toBe("");
        }

        if (!isErr(result3)) {
            expect(result3.kind).toBe("array");
            expect(result3.token).toBe("(boolean)[]");
            expect(result3.rest).toBe("| string");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result3, "extends", IT_Token<"array">>>,
        ];
    });

    it("bracketed arrays", () => {
        const result1 = it_takeArray__Bracket("Array<string>");
        const result2 = it_takeArray__Bracket("Array<string | number>");
        const result3 = it_takeArray__Bracket("Array<boolean> | string");

        type T = IT_TakeArray<"Array<foobar>">;
        const invalid = it_takeArray__Bracket("Array<foobar>");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.kind).toBe("array");
            expect(result1.token).toBe("Array<string>");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.kind).toBe("array");
            expect(result2.token).toBe("Array<string | number>");
            expect(result2.rest).toBe("");
        }

        if (!isErr(result3)) {
            expect(result3.kind).toBe("array");
            expect(result3.token).toBe("Array<boolean>");
            expect(result3.rest).toBe("| string");
        }

        // Type tests
        type cases = [
            Expect<Test<typeof result1, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result2, "extends", IT_Token<"array">>>,
            Expect<Test<typeof result3, "extends", IT_Token<"array">>>,
        ];
    });

    it("wrong handler cases", () => {
        const result1 = it_takeArray("string");
        const result2 = it_takeArray("Array");
        const result3 = it_takeArray("number");

        expect(isErr(result1, "wrong-handler")).toBe(true);
        expect(isErr(result2, "wrong-handler")).toBe(true);
        expect(isErr(result3, "wrong-handler")).toBe(true);
    });

    it("whitespace handling", () => {
        const result1 = it_takeArray("  string[]  ");
        const result2 = it_takeArray("Array<string>   | number");
        const result3 = it_takeArray("  (string | number)[]  ");

        expect(isErr(result1)).toBe(false);
        expect(isErr(result2)).toBe(false);
        expect(isErr(result3)).toBe(false);

        if (!isErr(result1)) {
            expect(result1.token).toBe("string[]");
            expect(result1.rest).toBe("");
        }

        if (!isErr(result2)) {
            expect(result2.token).toBe("Array<string>");
            expect(result2.rest).toBe("| number");
        }

        if (!isErr(result3)) {
            expect(result3.token).toBe("(string | number)[]");
            expect(result3.rest).toBe("");
        }
    });
});
