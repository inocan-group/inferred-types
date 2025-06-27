import { describe, expect, it } from "vitest";
import { isEmpty, isNotEmpty } from "inferred-types/runtime"
import { Expect, Empty, Test } from "inferred-types/types";

describe("isEmpty(val)", () => {

    it("happy path", () => {
        const t1 = isEmpty(null);
        const t2 = isEmpty(undefined);
        const t3 = isEmpty("");
        const t4 = isEmpty([]);
        const t5 = isEmpty({});

        expect(t1).toEqual(true);
        expect(t2).toEqual(true);
        expect(t3).toEqual(true);
        expect(t4).toEqual(true);
        expect(t5).toEqual(true);

        const f1 = isEmpty(" ");
        const f2 = isEmpty({ f: undefined });
        const f3 = isEmpty(["foo"] as string[]);
        const f4 = isEmpty(4);

        expect(f1).toEqual(false);
        expect(f2).toEqual(false);
        expect(f3).toEqual(false);
        expect(f4).toEqual(false);

        const foo = ["foo"] as string[];

        const str = "" as string;

        if (isEmpty(foo)) {
            type T = typeof foo;

            type cases = [
                Expect<Test<T, "equals", string[] & Empty>>
            ];
        }

        if (isEmpty(str)) {
            type T = typeof str;

            type cases = [
                Expect<Test<T, "equals", string & Empty>>
            ];
        }
    });
});

describe("isNotEmpty(val)", () => {

    it("first test", () => {
        const f1 = isNotEmpty(null);
        const f2 = isNotEmpty(undefined);
        const f3 = isNotEmpty("");
        const f4 = isNotEmpty([]);
        const f5 = isNotEmpty({});

        expect(f1).toEqual(false);
        expect(f2).toEqual(false);
        expect(f3).toEqual(false);
        expect(f4).toEqual(false);
        expect(f5).toEqual(false);

        const t1 = isNotEmpty(" ");
        const t2 = isNotEmpty({ f: undefined });
        const t3 = isNotEmpty(["foo"] as string[]);
        const t4 = isNotEmpty(4);

        expect(t1).toEqual(true);
        expect(t2).toEqual(true);
        expect(t3).toEqual(true);
        expect(t4).toEqual(true);

        const foo = ["foo"] as string[] | undefined;

        const str = "howdy" as "howdy" | Empty;

        if (isNotEmpty(foo)) {
            type T = typeof foo;

            type cases = [
                Expect<Test<T, "equals", string[]>>
            ];
        }

        if (isNotEmpty(str)) {
            type T = typeof str;

            // @ts-ignore
            type cases = [
                Expect<Test<T, "equals", "howdy">>
            ];
        }
    });


    it("as array filter", () => {
        const arr = [1, 2, undefined, 3, "", 4].filter(isNotEmpty);
        expect(arr).toEqual([1, 2, 3, 4])
    });

});



