import { describe, it } from "vitest";
import {
    AssertEqual,
    Expect,
} from "inferred-types/types";

import {
    MergeObjects,
} from "inferred-types/inferred-types";



/**
 * This tests Typescript source but source which the underlying
 * module uses relative imports to the dist folders.
 *
 * Note: Runtime tests are skipped here due to circular dependency issues
 * when importing from source. The transpiled tests validate runtime behavior.
 */
describe("import of Typescript from inferred-types module", () => {

    it("type symbols", () => {
        type T1 = MergeObjects<{foo:1},{bar:2}>;

        type cases = [
            Expect<AssertEqual<T1, { foo: 1; bar: 2}>>
        ];
    });

});


