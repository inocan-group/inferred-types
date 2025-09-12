import { Equal, Expect } from "@type-challenges/utils";
import type { DoneFnTuple, Test } from "inferred-types/types";

import { describe, it } from "vitest";

describe("DoneFnTuple", () => {

    it("happy path", () => {
        type Base = DoneFnTuple;

        type cases = [
            // Base Descriptions
            Expect<Test<Base["done"]["desc"], "equals",  "exits the API surface with the state which has been accumulated so far">>,
            Expect<Test<Base["add"]["desc"], "equals",  "add a value to the tuple/union">>,
        ];
    });

});

