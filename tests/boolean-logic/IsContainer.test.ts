import { describe, expect, it } from "vitest";
import { Container, DoesExtend, Expect, IsContainer, Test, Tuple } from "inferred-types/types";
import { isContainer, narrow } from "inferred-types/runtime";
import { ExpectTrue } from "@type-challenges/utils";

describe("IsContainer<T>", () => {

    it("happy path for object", () => {
        type ObjLit = IsContainer<{ foo: "bar" }>;
        type Empty = IsContainer<{}>;
        type GenericObj = IsContainer<NonNullable<unknown>>;
        type Rec = IsContainer<Record<string, string>>;


        type cases = [
            Expect<Test<ObjLit, "equals",  true>>,
            Expect<Test<Empty, "equals",  true>>,
            Expect<Test<GenericObj, "equals",  true>>,
            Expect<Test<Rec, "equals",  true>>,
        ];
    });

    it("happy path for Tuple", () => {
        type TupleLit = IsContainer<Tuple<string, 3>>;
        type Empty = IsContainer<[]>;
        type GenericTuple = IsContainer<Tuple>;
        type Arr = IsContainer<string[]>;

        type cases = [
            Expect<Test<TupleLit, "equals",  true>>,
            Expect<Test<Empty, "equals",  true>>,
            Expect<Test<GenericTuple, "equals",  true>>,
            Expect<Test<Arr, "equals",  true>>,
        ];
    });


    it("functions are not containers", () => {
        type F1 = IsContainer<() => "hi">;
        type F2 = IsContainer<Function>;
        type F3 = IsContainer<(() => "hi") & { foo: 1 }>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });

    it("scalars are not containers", () => {
        type Num = IsContainer<42>;
        type Str = IsContainer<"foo">;
        type Nada = IsContainer<null>;
        type Nada2 = IsContainer<undefined>;
        type Never = IsContainer<never>;
        type Always = IsContainer<any>;


        type cases = [
            Expect<Test<Num, "equals",  false>>,
            Expect<Test<Str, "equals",  false>>,
            Expect<Test<Nada, "equals",  false>>,
            Expect<Test<Nada2, "equals",  false>>,
            Expect<Test<Never, "equals",  false>>,
            Expect<Test<Always, "equals",  false>>,
        ];
    });
});

describe("isContainer(val)", () => {
    const lit_obj = { id: 1 } as { id: 1 } | null;
    const wide_obj = { id: 1 } as { id: number } | null;
    const lit_arr = narrow([1, 2, 3]) as unknown as readonly [1, 2, 3] | undefined;
    const wide_arr = [1, 2, 3] as number[] | undefined;

    it("literal object", () => {
        const v = isContainer(lit_obj);
        expect(v).toBe(true);

        if (isContainer(lit_obj)) {
            expect(true).toBe(true);

            type Value = typeof lit_obj;
            type cases = [
                ExpectTrue<DoesExtend<Value, { id: 1 }>>
            ];
        } else {
            throw new Error("lit_obj was NOT seen as a Container!");
        }
    });

    it("wide object", () => {
        const v = isContainer(wide_obj);
        expect(v).toBe(true);

        if (isContainer(wide_obj)) {
            expect(true).toBe(true);

            type Value = typeof wide_obj;
            type cases = [
                ExpectTrue<DoesExtend<Value, { id: number }>>
            ];
        } else {
            throw new Error("lit_obj was NOT seen as a Container!");
        }
    });

    it("literal array", () => {
        const v = isContainer(lit_arr);
        expect(v).toBe(true);

        if (isContainer(lit_arr)) {
            expect(true).toBe(true);

            type Value = typeof lit_arr;
            type cases = [
                Expect<Test<Value, "extends", readonly [1, 2, 3]>>
            ];
        } else {
            throw new Error("lit_arr was NOT seen as a Container!");
        }
    });

    it("wide array", () => {
        const v = isContainer(wide_arr);
        expect(v).toBe(true);

        if (isContainer(wide_arr)) {
            expect(true).toBe(true);

            type Value = typeof wide_arr;
            type cases = [
                ExpectTrue<DoesExtend<Value, Container>>
            ];
        } else {
            throw new Error("wide_arr was NOT seen as a Container!");
        }
    });

});
