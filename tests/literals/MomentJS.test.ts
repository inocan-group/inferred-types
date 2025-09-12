import { describe, it } from "vitest";
import type { Expect, IsMoment, Test } from "inferred-types/types";

import moment from "moment";

describe("MomentJS", () => {

    it("type should extends the instantiated library's API surface", () => {
        type MomentInstance = ReturnType<typeof moment>;

        // @ts-ignore
        type _cases = [
            Expect<Test<IsMoment<MomentInstance>, "equals", true >>,
        ];

    });

})
