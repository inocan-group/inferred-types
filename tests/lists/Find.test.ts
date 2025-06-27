import { Expect, Find, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Find<TList, 'equals', TValue, TIndex>", () => {

    it("happy path", () => {
        type List = [{ id: 1; val: "hi" }, { id: 2; val: "bye" }];
        type T1 = Find<List, "equals", 1, "id">;
        type T2 = Find<List, "equals", 2, "id">;
        type T3 = Find<List, "equals", 3, "id">;

        type cases = [
            Expect<Test<T1, "equals",  { id: 1; val: "hi" }>>,
            Expect<Test<T2, "equals",  { id: 2; val: "bye" }>>,
            Expect<Test<T3, "equals",  undefined>>,
        ];
    });

});

describe("Find<TList, 'extends', TValue, TIndex>", () => {


    it("happy path  without indexing", () => {
        type List = [number, 1, 2, string, "foo"];
        type Num = Find<List, "extends", number>;
        type Two = Find<List, "extends", 2>;
        type Str = Find<List, "extends", string>;
        type Foo = Find<List, "extends", "foo">;
        type Missing = Find<List, "extends", "bar">;
        type FooBar = Find<List, "extends", "foo" | "bar">;

        type cases = [
            Expect<Test<Num, "equals",  number>>,
            Expect<Test<Two, "equals",  2>>,
            Expect<Test<Str, "equals",  string>>,
            Expect<Test<Foo, "equals",  "foo">>,

            Expect<Test<Missing, "equals",  undefined>>,
            Expect<Test<Num, "equals",  number>>,
            Expect<Test<FooBar, "equals",  "foo">>,
        ];
    });


    it("happy path with indexing", () => {
        type List = [{ id: 1; val: "hi" }, { id: 2; val: "bye" }];
        type T1 = Find<List, "extends", 1, "id">;
        type T2 = Find<List, "extends", 2, "id">;
        type T3 = Find<List, "extends", 3, "id">;

        type cases = [
            Expect<Test<T1, "equals",  { id: 1; val: "hi" }>>,
            Expect<Test<T2, "equals",  { id: 2; val: "bye" }>>,
            Expect<Test<T3, "equals",  undefined>>,
        ];
    });

});
