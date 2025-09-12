import { describe, expect, it } from "vitest";
import { Expect, Find, Test } from "inferred-types/types";
import { find, narrow } from "inferred-types/runtime";
import { InputTokenSuggestions } from "inferred-types/types";

describe("Find<TList, 'equals', TValue, TIndex>", () => {

    it("objectKeyEquals operation", () => {
        type List = [{ id: 1; val: "hi" }, { id: 2; val: "bye" }];
        type T1 = Find<List, "objectKeyEquals", ["id", 1]>;
        type T2 = Find<List, "objectKeyEquals", ["id", 2]>;
        type T3 = Find<List, "objectKeyEquals", ["id", 3]>;

        type cases = [
            Expect<Test<T1, "equals",  { id: 1; val: "hi" }>>,
            Expect<Test<T2, "equals",  { id: 2; val: "bye" }>>,
            Expect<Test<T3, "equals",  undefined>>,
        ];
    });

    it("objectKeyExtends operation", () => {
        type Generics = [
            {name: "T", typeToken: "string", type: string; desc: undefined },
            {name: "U", typeToken: "number[]", type: number[]; desc: undefined },
        ];
        type T1 = Find<Generics, "objectKeyExtends", ["name", "T"]>;
        type F1 = Find<Generics, "objectKeyExtends", ["name", "X"]>;

        type cases = [
            Expect<Test<T1, "equals", {name: "T", typeToken: "string", type: string; desc: undefined }>>,
            Expect<Test<F1, "equals", undefined>>
        ]
    })

    it("extends operation", () => {
        type List = [number, 1, 2, string, "foo"];

        type Num = Find<List, "extends", [number]>;
        type Two = Find<List, "extends", [2]>;
        type Str = Find<List, "extends", [string]>;
        type Foo = Find<List, "extends", ["foo"]>;
        type Missing = Find<List, "extends", ["bar"]>;
        type FooBar = Find<List, "extends", ["foo" | "bar"]>;

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

    it("equals operation", () => {
        type List = [1, 2, number, "foo", string];

        type Two = Find<List, "equals", [2]>;
        type Foo = Find<List, "equals", ["foo"]>;

        type Missing = Find<List, "equals", ["bar"]>;

        type cases = [
            Expect<Test<Two, "equals",  2>>,
            Expect<Test<Foo, "equals",  "foo">>,

            Expect<Test<Missing, "equals",  undefined>>,
        ];
    });
});


// RUNTIME TESTS

describe("find(op, ...params) -> (list) -> result", () => {

    const list = narrow(1,2, 0 as number, "foo", "str" as string);


    it("equals op", () => {
        const f2 = find("equals", 2);
        const two = f2(list);

        expect(two).toBe(2);


        type cases = [
            Expect<Test<typeof two, "equals", 2>>,
        ];
    });


    it("extends op", () => {
        const findNumber = find("extends", 0 as number);
        const num = findNumber(list);

        type cases = [
            Expect<Test<typeof num, "equals", 1>>,
        ];
    });

})
