import { Expect, TakeFirst, Test, TupleMeta } from "inferred-types/types";
import { describe, it } from "vitest";



describe("TakeFirst<TContent,TLen,[THandle]>", () => {

    it("happy path", () => {
        type Arr = [1, 2, 3, "foo", "bar"];

        type Two = TakeFirst<Arr, 2>;
        type Three = TakeFirst<Arr, 3>;
        type Biggie = TakeFirst<Arr, 100>;

        type cases = [
            Expect<Test<Two, "equals", [1, 2]>>,
            Expect<Test<Three, "equals", [1, 2, 3]>>,
            Expect<Test<Biggie, "equals", Arr>>,
        ];
    });


    it("all elements are optional", () => {
        type T1 = TakeFirst<[1?, 2?, 3?, string?], 1>;
        type T2 = TakeFirst<[1?, 2?, 3?, string?], 2>;
        type T3 = TakeFirst<[1?, 2?, 3?, string?], 3>;
        type T4 = TakeFirst<[1?, 2?, 3?, string?], 4>;

        type cases = [
            Expect<Test<T1, "equals", [1?]>>,
            Expect<Test<T2, "equals", [1?, 2?]>>,
            Expect<Test<T3, "equals", [1?, 2?, 3?]>>,
            Expect<Test<T4, "equals", [1?, 2?, 3?, string?]>>,
        ];
    });


    it("some elements are optional", () => {
        type T1 = TakeFirst<[1, 2?, 3?, string?], 1>;
        type T2 = TakeFirst<[1, 2?, 3?, string?], 2>;
        type T3 = TakeFirst<[1, 2?, 3?, string?], 3>;
        type T4 = TakeFirst<[1, 2?, 3?, string?], 4>;
        type X = TupleMeta<[1, 2?, 3?, string?]>;


        type cases = [
            Expect<Test<T1, "equals", [1]>>,
            Expect<Test<T2, "equals", [1, 2?]>>,
            Expect<Test<T3, "equals", [1, 2?, 3?]>>,
            Expect<Test<T4, "equals", [1, 2?, 3?, string?]>>,
        ];
    });
});
