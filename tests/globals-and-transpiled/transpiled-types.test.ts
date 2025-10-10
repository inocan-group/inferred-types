import { describe, expect, it } from "vitest";
import {
    AssertEqual,
    Expect,
} from "inferred-types/types";

import {
    MergeObjects
} from "transpiled/types";

describe("imports from transpiled source; found in modules/types/dist'", () => {

    it("type symbols", () => {
        type T1 = MergeObjects<{foo:1},{bar:2}>;

        type cases = [
            Expect<AssertEqual<T1, { foo: 1; bar: 2}>>
        ];
    });



});
