import { describe, it } from "vitest";
import type { Expect, Test, TupleToIntersection } from "inferred-types/types";

describe("TupleToIntersection<T,[E]>", () => {

    it("non-overlapping dictionaries", () => {
        type T1 = TupleToIntersection<[{foo:1},{bar:2},{baz:3}]>;
        type T2 = TupleToIntersection<[{foo:1},{bar:string},{baz:number}]>;

        type cases = [
            Expect<Test<T1, "equals", { foo: 1; bar: 2; baz: 3 }>>,
            Expect<Test<T2, "equals", { foo: 1; bar: string; baz: number }>>,
        ];
    });

    it("overlapping but non-destructive dictionaries", () => {
        type T1 = TupleToIntersection<[{ foo: 1 }, { foo: number }]>;

        type cases = [
            Expect<Test<T1, "equals", { foo: 1 }>>
        ];
    });

    it("overlapping and destructive dictionaries", () => {
        type T1 = TupleToIntersection<[{ foo: 1 }, { foo: string }]>;
        type E1 = TupleToIntersection<[{ foo: 1 }, { foo: string }], "error">;

        type cases = [
            Expect<Test<T1, "equals", never>>,

            Expect<Test<E1, "isError", "invalid-intersection">>,
            Expect<Test<E1["conflict"], "equals", { foo: string } >>
        ];
    });

    it("dictionaries and functions intersected", () => {
        type T1 = TupleToIntersection<[
            (name: string) => "hi",
            { foo: 1 },
            { bar: 2 }
        ]>;
        type T2 = TupleToIntersection<[
            ((name: string) => "hi") & { name: "greet"},
            { foo: 1 },
            { bar: 2 }
        ]>

        type cases = [
            Expect<Test<T1, "equals", ((name: string) => "hi") & {
                foo: 1;
                bar: 2;
            }>>,
            Expect<Test<T2, "equals", ((name: string) => "hi") & {
                name: "greet";
                foo: 1;
                bar: 2;
            }>>,
        ];
    });

});
