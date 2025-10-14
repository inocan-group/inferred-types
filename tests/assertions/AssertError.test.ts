import { describe, it } from "vitest";
import {
    AssertError,
    AssertFalse,
    AssertAssertionError,
    Err,
    Expect,
} from "inferred-types/types";
import { AssertTrue } from "transpiled";

describe("AssertError<Test,Type,SubType>", () => {

    it("happy path", () => {
        type T1 = AssertError<Error>;
        type T2 = AssertError<Err<"foo">>;
        type F1 = AssertError<"foo">;
        type F2 = AssertError<{ type: "something"; message: "test" }>;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>
        ];
    });


    it("Error of given type", () => {
        type T1 = AssertError<Err<"foo">, "foo">;
        type F1 = AssertError<Err<"foo">, "bar">;
        type F2 = AssertError<Error, "foo">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>
        ];
    });


    it("Error with type and subtype", () => {
        // Positive cases - correct type and subtype
        type T1 = AssertError<Err<"validation/required">, "validation", "required">;
        type T2 = AssertError<Err<"network/timeout">, "network", "timeout">;

        // Negative cases - wrong type
        type F1 = AssertError<Err<"validation/required">, "network", "required">;

        // Negative cases - correct type but wrong subtype
        type F2 = AssertError<Err<"validation/required">, "validation", "invalid">;

        // Negative cases - both wrong
        type F3 = AssertError<Err<"validation/required">, "network", "timeout">;

        // Negative cases - plain Error without type/subtype
        type F4 = AssertError<Error, "validation", "required">;

        type cases = [
            Expect<AssertTrue<T1>>,
            Expect<AssertTrue<T2>>,
            Expect<AssertFalse<F1>>,
            Expect<AssertFalse<F2>>,
            Expect<AssertFalse<F3>>,
            Expect<AssertFalse<F4>>
        ];
    });


    it("edge cases", () => {
        type F1 = AssertError<never>;
        type F2 = AssertError<any>;
        type F3 = AssertError<unknown>;


        type cases = [
            Expect<AssertAssertionError<F1>>,
            Expect<AssertAssertionError<F2>>,
            Expect<AssertAssertionError<F3>>,
        ];
    });



});
