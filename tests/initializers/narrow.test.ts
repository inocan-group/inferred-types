import { describe, expect, it } from "vitest";
import {
    Expect,
    AssertEqual,
} from "inferred-types/types";
import { narrow } from "inferred-types/runtime";

describe("narrow()", () => {

    it("inline scalar", () => {
        const five = narrow(5);
        const nope = narrow(false);
        const foo = narrow("foo");

        type cases = [
            Expect<AssertEqual<typeof five, 5>>,
            Expect<AssertEqual<typeof nope, false>>,
            Expect<AssertEqual<typeof foo, "foo">>,
        ];
    });


    it("inline array", () => {
        const numeric = narrow([1,2,3]);
        const str = narrow(["foo","bar","baz"]);
        const deep = narrow([[1,2],[3,4]]);

        expect(numeric).toEqual([1,2,3]);
        expect(str).toEqual(["foo","bar","baz"]);
        expect(deep).toEqual([[1,2],[3,4]]);

        type cases = [
            Expect<AssertEqual<typeof numeric, [1,2,3]>>,
            Expect<AssertEqual<typeof str, ["foo","bar","baz"]>>,
            Expect<AssertEqual<typeof deep, [[1,2], [3,4]]>>,
        ];
    });


    it("inline dictionary", () => {
        const fooBar = narrow({foo: 1}, {bar: 2});
        const solo = narrow({foo: 1});
        const nesting = narrow({
            foo: ["foo"],
            bar: "nope",
            baz: [1,2,3],
            sometimes: ["foo",undefined,"bar"],
            mixed: ["foo", 1]
        });

        expect(fooBar).toEqual([{foo: 1}, {bar: 2}]);
        expect(solo).toEqual({foo: 1});
        expect(nesting).toEqual({
            foo: ["foo"],
            bar: "nope",
            baz: [1,2,3],
            sometimes: ["foo",undefined,"bar"],
            mixed: ["foo", 1]
        });

        type cases = [
            Expect<AssertEqual<typeof fooBar, [{foo:1}, {bar:2}]>>,
            Expect<AssertEqual<typeof solo, {foo:1}>>,
            Expect<AssertEqual<typeof nesting, {
                foo: ["foo"],
                bar: "nope",
                baz: [1,2,3],
                sometimes: ["foo",undefined,"bar"],
                mixed: ["foo", 1]
            }>>,
        ];
    });

    it("array", () => {
        const numeric = narrow(1,2,3);
        const str = narrow("foo","bar","baz");
        const deep = narrow([1,2],[3,4]);

        expect(numeric).toEqual([1,2,3]);
        expect(str).toEqual(["foo","bar","baz"]);
        expect(deep).toEqual([[1,2],[3,4]]);

        type cases = [
            Expect<AssertEqual<typeof numeric, [1,2,3]>>,
            Expect<AssertEqual<typeof str, ["foo","bar","baz"]>>,
            Expect<AssertEqual<typeof deep, [[1,2], [3,4]]>>,
        ];
    });


    it("dictionary", () => {
        const fooBar = narrow([{foo: 1},{bar:2}]);
        const solo = narrow([{foo: 1}]); // remains as an array
        const nesting = narrow([{
            foo: ["foo"],
            bar: "nope",
            baz: [1,2,3],
            sometimes: ["foo",undefined,"bar"],
            mixed: ["foo", 1]
        }]);

        expect(fooBar).toEqual([{foo: 1}, {bar: 2}]);
        expect(solo).toEqual([{foo: 1}])

        type cases = [
            Expect<AssertEqual<typeof fooBar, [{foo:1}, {bar:2}]>>,
            Expect<AssertEqual<typeof solo, [{foo:1}]>>,
            Expect<AssertEqual<
                typeof nesting,
                [{
                    foo: ["foo"];
                    bar: "nope";
                    baz: [1, 2, 3];
                    sometimes: ["foo", undefined, "bar"];
                    mixed: ["foo", 1];
                }]
            >>
        ];

    });



});
