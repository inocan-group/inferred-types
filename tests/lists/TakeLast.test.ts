
import { describe, it } from "vitest";
import type { Expect, TakeLast, Test } from "inferred-types/types";

describe("TakeLast<TContent,TLen,[THandle]>", () => {

    it("happy path", () => {
        type Arr = [1, 2, 3, "foo", "bar"];

        type Two = TakeLast<Arr, 2>;
        type Three = TakeLast<Arr, 3>;
        type Biggie = TakeLast<Arr, 100>;

        type cases = [
            Expect<Test<Two, "equals", ["foo", "bar"]>>,
            Expect<Test<Three, "equals", [3, "foo", "bar"]>>,
            Expect<Test<Biggie, "equals", Arr>>,

        ];
    });

    it("all elements are optional", () => {
        type T1 = TakeLast<[1?, 2?, 3?, string?], 1>;
        type T2 = TakeLast<[1?, 2?, 3?, string?], 2>;
        type T3 = TakeLast<[1?, 2?, 3?, string?], 3>;
        type T4 = TakeLast<[1?, 2?, 3?, string?], 4>;

        type cases = [
            Expect<Test<T1, "equals", [string?]>>,
            Expect<Test<T2, "equals", [3?, string?]>>,
            Expect<Test<T3, "equals", [2?, 3?, string?]>>,
            Expect<Test<T4, "equals", [1?, 2?, 3?, string?]>>,
        ];
    });

    it("some elements are optional", () => {
        type T1 = TakeLast<[1, 2?, 3?, string?], 1>;
        type T2 = TakeLast<[1, 2?, 3?, string?], 2>;
        type T3 = TakeLast<[1, 2?, 3?, string?], 3>;
        type T4 = TakeLast<[1, 2?, 3?, string?], 4>;

        type cases = [
            Expect<Test<T1, "equals", [string?]>>,
            Expect<Test<T2, "equals", [3?, string?]>>,
            Expect<Test<T3, "equals", [2?, 3?, string?]>>,
            Expect<Test<T4, "equals", [1, 2?, 3?, string?]>>,
        ];
    });

});
