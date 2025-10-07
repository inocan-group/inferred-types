
import { describe, it } from "vitest";
import type {
    AssertFalse,
    Err,
    Expect,
    HasSameValues,
    Test,
    AssertTrue
} from "inferred-types/types";

describe("HasSameValues<TContainer,TComparator", () => {

    it("testing with tuples", () => {
        type T1 = HasSameValues<[], []>;
        type T2 = HasSameValues<[1, 2, 3], [3, 2, 1]>;
        type T3 = HasSameValues<[1, 2, 3], [3, 1, 2]>;

        type F1 = HasSameValues<[], [3, 2, 1]>;
        type F2 = HasSameValues<[3, 2, 1], []>;
        type F3 = HasSameValues<[1, 2, 5], [3, 2, 1]>;
        type F4 = HasSameValues<[1, 2, 3], [1, 2, 3, 4]>;
        type F5 = HasSameValues<[1, 2, 3, 4], [1, 2, 3]>;

        type cases = [
            Expect<Test<T1, "equals",  true>>,
            Expect<Test<T2, "equals",  true>>,
            Expect<Test<T3, "equals",  true>>,

            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
            Expect<Test<F4, "equals",  false>>,
            Expect<Test<F5, "equals",  false>>,
        ];
    });


    it("testing with arrays having optional elements", () => {
        type T1 = HasSameValues<
            [1,2,3?],
            [2,1,3?]
        >
        type T2 = HasSameValues<
            [1,2,3?],
            [1,2,3?]
        >
        type F1 = HasSameValues<
            [1,2,3?],
            [2,1,3]
        >

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertFalse<F1>>,
        ];
    });


    it("same values with different type structures do NOT match", () => {
        type T1 = HasSameValues<{foo: 1; bar: 2}, [1,2]>;
        type T2 = HasSameValues<{foo: 1; bar: 2}, [2,1]>;

        type cases = [
            Expect<Test<T1, "equals", false>>,
            Expect<Test<T2, "equals", false>>,
        ];
    });

    it("testing with never", () => {
        type F1 = HasSameValues<[1, 2, 3], never>;
        type F2 = HasSameValues<never, [1, 2, 3]>;
        type F3 = HasSameValues<never, never>;

        type cases = [
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<F3, "equals",  false>>,
        ];
    });

    it("testing with any", () => {
        type F1 = HasSameValues<[1, 2, 3], any>;
        type F2 = HasSameValues<any, [1, 2, 3]>;
        type F3 = HasSameValues<any, any>;

        type O1 = HasSameValues<[1, 2, 3], any, Err<"oops/there-i-go-again">>;
        type O2 = HasSameValues<[1, 2, 3], any, Err<"oops/there-i-go-again">>;

        type cases = [
            Expect<Test<F3, "equals",  false>>,
            Expect<Test<F1, "equals",  false>>,
            Expect<Test<F2, "equals",  false>>,
            Expect<Test<O1, "isError", "oops">>,
            Expect<Test<O1, "isError", "oops/there-i-go-again">>,
        ];
    });

});
