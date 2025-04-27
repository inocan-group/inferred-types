import { pathJoin } from "inferred-types/runtime";
import { Expect, PathJoin, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";

// Note: type tests fail visible inspection but pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("PathJoin<T,U>", () => {
    it("only literals / happy path", () => {
        type T1 = PathJoin<["foo", "bar"]>;
        type T2 = PathJoin<["foo/", "bar"]>;
        type T3 = PathJoin<["foo", "/bar"]>;
        type T4 = PathJoin<["foo/", "/bar"]>;
        type T5 = PathJoin<["/foo/", "/bar"]>;
        type T6 = PathJoin<["foo/", "/bar/"]>;

        type cases = [
            // neither have divider
            Expect<Test<T1, "equals", "foo/bar">>,
            // one has, one does not
            Expect<Test<T2, "equals", "foo/bar">>,
            Expect<Test<T3, "equals", "foo/bar">>,
            // both have
            Expect<Test<T4, "equals", "foo/bar">>,
            // leading slash
            Expect<Test<T5, "equals", "/foo/bar">>,
            // trailing slash
            Expect<Test<T6, "equals", "foo/bar/">>
        ];
    });

    it("PathJoin<T,U> with U as array", () => {
        type T1 = PathJoin<["foo", "bar", "baz"]>;
        type T2 = PathJoin<["/foo/", "/bar/", "/baz/"]>;
        type T3 = PathJoin<["/foo/", "bar", "/baz"]>;

        type cases = [
            //
            Expect<Test<T1, "equals", "foo/bar/baz">>,
            Expect<Test<T2, "equals", "/foo/bar/baz/">>,
            Expect<Test<T3, "equals", "/foo/bar/baz">>
        ];
    });

    it("wide types mixed in", () => {
        type T1 = PathJoin<["foo", string]>;
        type T2 = PathJoin<["foo/", string]>;
        type T3 = PathJoin<[string, "/bar"]>;
        type T4 = PathJoin<[string, "bar"]>;

        type cases = [
            Expect<Test<T1, "equals", `foo/${string}`>>,
            Expect<Test<T2, "equals", `foo/${string}`>>,
            Expect<Test<T3, "equals", `${string}/bar`>>,
            Expect<Test<T4, "equals", `${string}/bar`>>
        ];
    });
});

describe("pathJoin() runtime util", () => {
    it("no leading or trailing slashes", () => {
        const t1 = pathJoin("foo", "bar");
        const t2 = pathJoin("foo/", "bar");
        const t3 = pathJoin("foo", "/bar");
        const t4 = pathJoin("foo/", "/bar");
        // multi
        const t5 = pathJoin("foo/", "bar", "/baz");
        const t6 = pathJoin("foo/", "bar/", "/baz");

        [t1, t2, t3, t4].forEach((test) =>
            expect(test, "no leading or trailing slash").toBe("foo/bar")
        );
        [t5, t6].forEach((test) =>
            expect(test, "no leading or trailing slash (with multi U)").toBe("foo/bar/baz")
        );
    });

    it("leading and trailing slashes", () => {
        const t1 = pathJoin("/foo", "bar");
        const t2 = pathJoin("foo/", "bar/");
        const t3 = pathJoin("/foo", "bar", "/baz");
        const t4 = pathJoin("foo/", "/bar/", "/baz/");
        // runtime tests
        expect(t1).toBe("/foo/bar");
        expect(t2).toBe("foo/bar/");
        expect(t3).toBe("/foo/bar/baz");
        expect(t4).toBe("foo/bar/baz/");
    });

    it("singular value", () => {
        const t1 = pathJoin("foo");
        const t2 = pathJoin("foo/");

        // runtime
        expect(t1).toBe("foo");
        expect(t2).toBe("foo/");

        // design time
        type cases = [
            //
            Expect<Test<typeof t1, "equals", "foo">>,
            Expect<Test<typeof t2, "equals", "foo/">>
        ];
    });
});
