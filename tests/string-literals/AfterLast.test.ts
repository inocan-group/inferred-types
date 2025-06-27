import { Expect, AfterLast, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("AfterLast<TText, TFind, [TBreak]>", () => {

    it("happy path", () => {
        type T1 = AfterLast<`Array<Record<string, string>>`, ">">;
        type T2 = AfterLast<`Array<Record<string, string>>  `, ">">;
        type T3 = AfterLast<`Array<Record<string, string>>  abc`, ">">;

        type cases = [
            Expect<Test<T1, "equals", "">>,
            Expect<Test<T2, "equals", "  ">>,
            Expect<Test<T3, "equals", "  abc">>,
        ];
    });

    it("with break character", () => {
        type T1 = AfterLast<
            `Array<Record<string, string>> | Array<string>`,
            ">",
            "|"
        >;

        type cases = [
            Expect<Test<T1, "equals", " | Array<string>">>,
        ];
    });

    it("with break union", () => {
        type T1 = AfterLast<
            `Array<Record<string, string>> | Array<string>`,
            ">",
            "|" | ")"
        >;

        type cases = [
            Expect<Test<T1, "equals", " | Array<string>">>,
        ];
    });

    it("split char not found (no break char) always returns empty string", () => {
        type T1 = AfterLast<`Array<Record<string, string>>`, ")">;
        type T2 = AfterLast<`Array<Record<string, string>>   `, ")">;

        type cases = [
            Expect<Test<T1, "equals", "">>,
            Expect<Test<T2, "equals", "">>,
        ];
    });

    it("split char not found (with break character); should return content after the break", () => {
        type T1 = AfterLast<
            "Array<Record<string, string>> |after",
            ">", "|"
        >;
        type T2 = AfterLast<
            "Array<Record<string, string>> |after",
            ">", "|", true
        >;

        type cases = [
            Expect<Test<T1, "equals", " |after">>,
            Expect<Test<T2, "equals", "|after">>,
        ];
    });

});
