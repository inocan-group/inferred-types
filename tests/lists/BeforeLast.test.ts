import { describe, it } from "vitest";
import type { BeforeLast, Expect, Test } from "inferred-types/types";

describe("BeforeLast", () => {

    it("happy path for string", () => {
        type Foobar = BeforeLast<"foobar">;

        type Empty = BeforeLast<"">;
        type Wide = BeforeLast<string>;

        type cases = [
            Expect<Test<Foobar, "equals",  "fooba">>,
            Expect<Test<Empty, "equals",  "">>,
            Expect<Test<Wide, "equals",  string>>,
        ];
    });

});
