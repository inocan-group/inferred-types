import { Slice, Test, Expect } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Slice<TList, TStart, TEnd>", () => {
    type List = [1, 2, 3, 4, 5, 6, 7, 8];
    type ListRO = readonly [1, 2, 3, 4, 5, 6, 7, 8];

    it("slicing a tuple/list", () => {

        type LastTwo = Slice<List, -2>;
        type RoLastTwo = Slice<ListRO, -2>;

        type FirstTwo = Slice<List, 0, 2>;
        type FirstThree = Slice<List, 0, 3>;
        type OneToThree = Slice<List, 1, 3>;
        type ThreeOnward = Slice<List, 3>;
        type SkipLastTwo = Slice<List, 0, -2>;

        type RoFirstTwo = Slice<ListRO, 0, 2>;
        type RoFirstThree = Slice<ListRO, 0, 3>;
        type RoOneToThree = Slice<ListRO, 1, 3>;
        type RoThreeOnward = Slice<ListRO, 3>;
        type RoSkipLastTwo = Slice<ListRO, 0, -2>;

        type cases = [
            Expect<Test<LastTwo, "equals", [7, 8]>>,
            Expect<Test<RoLastTwo, "equals", [7, 8]>>,

            Expect<Test<FirstTwo, "equals", [1, 2]>>,
            Expect<Test<FirstThree, "equals", [1, 2, 3]>>,
            Expect<Test<OneToThree, "equals", [2, 3, 4]>>,
            Expect<Test<ThreeOnward, "equals", [4, 5, 6, 7, 8]>>,
            Expect<Test<SkipLastTwo, "equals", [1, 2, 3, 4, 5, 6]>>,

            Expect<Test<RoFirstTwo, "equals", [1, 2]>>,
            Expect<Test<RoFirstThree, "equals", [1, 2, 3]>>,
            Expect<Test<RoOneToThree, "equals", [2, 3, 4]>>,
            Expect<Test<RoThreeOnward, "equals", [4, 5, 6, 7, 8]>>,
            Expect<Test<RoSkipLastTwo, "equals", [1, 2, 3, 4, 5, 6]>>,
        ];

    });

    it("slicing a string", () => {
        type Foo = Slice<"FooBar", 0, 3>;
        type Bar = Slice<"FooBar", 3, 3>;
        type Bar2 = Slice<"FooBar", 3>;

        type cases = [
            Expect<Test<Foo, "equals",  "Foo">>,
            Expect<Test<Bar, "equals",  "Bar">>,
            Expect<Test<Bar2, "equals",  "Bar">>,
        ];
    });

});
