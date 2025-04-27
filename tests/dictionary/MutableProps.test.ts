import { describe, it } from "vitest";
import type {
    Expect,
    Test,
    MakePropsMutable,
    Mutable,
    MutablePropsExclusive
} from "inferred-types/types";

describe("MutableProp<T,M> and MutableProps<T,M>", () => {

    it("Basics", () => {
        type T = {
            readonly foo: string;
            bar?: number;
            readonly baz: boolean;
        };
        type Mut = Mutable<T>;
        type Foo = MakePropsMutable<T, "foo">;
        type Bar = MutablePropsExclusive<T, ["bar"]>

        type cases = [
            Expect<Test<
                Mut, "equals",
                { foo: string; bar?: number | undefined; baz: boolean }
            >>,
            Expect<Test<
                Foo, "equals",
                { foo: string; bar?: number | undefined; readonly baz: boolean }
            >>,
            Expect<Test<
                Bar,
                "equals",
                {
                    readonly foo: string;
                    bar?: number | undefined;
                    readonly baz: boolean;
                }
            >>,
        ];
    });


    it("MutableProp<T,M> ", () => {
        type T = { foo: string; bar?: number; readonly baz: boolean };
        type Foo = MakePropsMutable<T, ["foo", "bar"]>;
        type FooAlt = MakePropsMutable<T, "foo" | "bar">;
        type Bar = MakePropsMutable<T, "bar">;
        type Bar2 = MakePropsMutable<T, ["bar"]>;
        type FooBar = MakePropsMutable<T, "foo" | "bar">;
        type FooBaz = MakePropsMutable<T, "foo" | "baz">;

        type cases = [
            Expect<Test<
                Foo,
                "equals",
                { foo: string; bar?: number; readonly baz: boolean }
            >>,
            Expect<Test<
                FooAlt,
                "equals",
                { foo: string; bar?: number; readonly baz: boolean }
            >>,
            Expect<Test<
                Bar,
                "equals",
                { foo: string; bar?: number; readonly baz: boolean }
            >>,
            Expect<Test<
                Bar2,
                "equals",
                { foo: string; bar?: number; readonly baz: boolean }
            >>,
            Expect<Test<
                FooBar,
                "equals",
                { foo: string; bar?: number; readonly baz: boolean }
            >>,
            Expect<Test<
                FooBaz,
                "equals",
                { foo: string; bar?: number; baz: boolean }
            >>
        ];
    });


    it("MutablePropsExclusive<T,M>", () => {
        type T = { foo: string; bar?: number; readonly baz: boolean };
        type Foo = MutablePropsExclusive<T, ["foo", "bar"]>;
        type Bar = MutablePropsExclusive<T, ["bar"]>;
        type FooBar = MutablePropsExclusive<T, ["foo", "bar"]>;
        type FooBaz = MutablePropsExclusive<T, ["foo", "baz"]>;

        type cases = [
            Expect<Test<
                Foo,
                "equals",
                { foo: string; bar?: number; readonly baz: boolean }
            >>,
            Expect<Test<
                Bar,
                "equals",
                { readonly foo: string; bar?: number; readonly baz: boolean }
            >>,

            Expect<Test<
                FooBar,
                "equals",
                { foo: string; bar?: number; readonly baz: boolean }
            >>,
            Expect<Test<
                FooBaz,
                "equals",
                { foo: string; readonly bar?: number; baz: boolean }
            >>
        ];
    });

});
