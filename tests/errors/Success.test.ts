import { Equal, Expect } from "@type-challenges/utils";
import { Err, IsWideString, Join, NestedSplit, RetainAfter, Success, Trim } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Success<T>", () => {

    it("happy path", () => {
        type Never = Success<Error>;
        type Str = Success<Error | string>;
        type Union = Success<Error | string | number>;

        type cases = [
            Expect<Equal<Never, never>>,
            Expect<Equal<Str, string>>,
            Expect<Equal<Union, string | number>>,
        ];
    });


    it("using a typed error", () => {
        type T1 = Success<Err<`Oops`> | string>;

        type cases = [
            Expect<Equal<T1, string>>
        ];
    });


    it("no impact using on a type without an error in the union type", () => {
        type T1 = Success<string>;

        type cases = [
            Expect<Equal<T1, string>>
        ];
    });



});
