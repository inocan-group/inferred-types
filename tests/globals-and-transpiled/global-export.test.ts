import { describe, it } from "vitest";
import type {
    AssertEqual,
    Expect,
} from "inferred-types/types";

import type {
    MergeObjects,
} from "inferred-types/types";



/**
 * This tests TypeScript types from the source code, ensuring type utilities
 * work correctly during development.
 *
 * Note: This tests the SOURCE code, not the bundled output. To test how
 * consumers will use the package, run:
 * ```bash
 * pnpm test:bundle
 * ```
 *
 * The bundle test validates:
 * - Actual bundled dist files work correctly
 * - No workspace reference leaks
 * - ESM imports function properly
 * - Runtime functions work in the bundle
 */
describe("import of TypeScript types from inferred-types source", () => {

    it("type symbols", () => {
        type T1 = MergeObjects<{foo:1},{bar:2}>;

        type cases = [
            Expect<AssertEqual<T1, { foo: 1; bar: 2}>>
        ];
    });

});


