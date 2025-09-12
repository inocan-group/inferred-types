
import { describe, it } from "vitest";
import type { Err, Expect, Success, Test } from "inferred-types/types";

describe("Success<T>", () => {

    it("happy path", () => {
        type Never = Success<Error>;
        type Str = Success<Error | string>;
        type Union = Success<Error | string | number>;

        type cases = [
            Expect<Test<Never, "equals",  never>>,
            Expect<Test<Str, "equals",  string>>,
            Expect<Test<Union, "equals",  string | number>>,
        ];
    });

    it("using a typed error", () => {
        type T1 = Success<Err<`Oops`> | string>;

        type cases = [
            Expect<Test<T1, "equals",  string>>
        ];
    });

    it("no impact using on a type without an error in the union type", () => {
        type T1 = Success<string>;

        type cases = [
            Expect<Test<T1, "equals",  string>>
        ];
    });

});
