import { describe, it } from "vitest";
import { Expect, IsContainer, Test, Tuple } from "inferred-types/types";

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


    it("non-containers return false", () => {
        type Num = IsContainer<42>;
        type Str = IsContainer<"foo">;
        type Nada = IsContainer<null>;
        type Nada2 = IsContainer<undefined>;
        type Never = IsContainer<never>;

        type cases = [
            Expect<Test<Num, "equals",  false>>,
            Expect<Test<Str, "equals",  false>>,
            Expect<Test<Nada, "equals",  false>>,
            Expect<Test<Nada2, "equals",  false>>,
            Expect<Test<Never, "equals",  false>>,
        ];
    });


});
