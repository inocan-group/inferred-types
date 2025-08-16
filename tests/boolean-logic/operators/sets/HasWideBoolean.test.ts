import { describe, it } from "vitest";
import {
    Expect,
    HasWideBoolean,
    Test,
} from "inferred-types/types";

describe("HasWideBoolean<T>", () => {

    it("positive tests", () => {
        type T1 = HasWideBoolean<[1,2,boolean]>;
        type T2 = HasWideBoolean<[boolean]>;
        type T3 = HasWideBoolean<[boolean,1,"foo",boolean]>;

        type cases = [
            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });


    it("negative tests", () => {
        type F1 = HasWideBoolean<[1,2]>;
        type F2 = HasWideBoolean<[]>;
        type F3 = HasWideBoolean<[1,"foo",true]>;

        type cases = [
            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });


    it("any, never", () => {
        type E1 = HasWideBoolean<any>;
        type E2 = HasWideBoolean<never>;

        type cases = [
            Expect<Test<E1, "isError", "invalid">>,
            Expect<Test<E2, "isError", "invalid">>,
        ];
    });



});
