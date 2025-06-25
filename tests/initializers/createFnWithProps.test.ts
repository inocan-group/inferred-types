import { Equal, Expect } from "@type-challenges/utils";
import { describe, it, expect } from "vitest";

import {
    createFnWithProps,
    fnProps
} from "inferred-types/runtime";
import { FnKeyValue, Test } from "inferred-types/types";


const fn = () => "hi" as const;

const fnWithParam = (name: string) => `hi ${name}` as const;
const fnWithTwoParam = (name: string, age: number) => `hi ${name}, you are ${age}` as const;
const fnNarrowing = <T extends string>(name: T) => `hi ${name}` as const;

describe("createFnWithProps()", () => {
    it("happy path", () => {
        const foo = createFnWithProps(fn, { foo: 42 });
        expect(foo.foo).toBe(42);
        const fooWithParam = createFnWithProps(fnWithParam, { foo: 42 });
        const fooWithTwo = createFnWithProps(fnWithTwoParam, { foo: 42 });
        const fooNarrowing = createFnWithProps(fnNarrowing, { foo: 42 });

        const n_foo = createFnWithProps(fn, { foo: 42 }, true);
        const n_fooWithParam = createFnWithProps(fnWithParam, { foo: 42 }, true);
        const n_fooWithTwo = createFnWithProps(fnWithTwoParam, { foo: 42 }, true);
        const n_fooNarrowing = createFnWithProps(fnNarrowing, { foo: 42 }, true);

        type cases = [
            Expect<Test<typeof foo, "equals",  (() => "hi") & { foo: 42 }>>,
            Expect<Test<
                typeof fooWithParam,
                "equals",
                ((name: string) => `hi ${string}`) & { foo: 42 }
            >>,
            Expect<Test<
                typeof fooWithTwo,
                "equals",
                ((name: string, age: number) => `hi ${string}, you are ${number}`) & { foo: 42 }
            >>,
            Expect<Test<
                typeof fooNarrowing,
                "equals",
                ((name: string) => `hi ${string}`) & { foo: 42 }
            >>,

            Expect<Test<
                typeof n_foo,
                "equals",
                (<A extends []>(...args: A) => "hi") & { foo: 42 }
            >>,
            Expect<Test<
                typeof n_fooWithParam,
                "equals",
                (<A extends [name: string]>(...args: A) => `hi ${string}`) & { foo: 42 }
            >>,
            Expect<Test<
                typeof n_fooWithTwo,
                "equals",
                (<A extends [name: string, age: number]>(...args: A) => `hi ${string}, you are ${number}`) & { foo: 42 }
            >>,
            Expect<Test<
                typeof n_fooNarrowing,
                "equals",
                (<A extends [name: string]>(...args: A) => `hi ${string}`) & { foo: 42 }
            >>,
        ];

    });


    it("anon function has empty string for name", () => {
        const anon = createFnWithProps(() => "hi", { foo: 42 });

        expect(anon.name).toBe("");

        type Anon = typeof anon["name"];

        type cases = [
            Expect<Test<Anon, "equals",  string>>,
        ];
    });


    it("named function retains name for combined output", () => {
        const named = createFnWithProps(function Welcome() { return "hi" }, { foo: 42 });

        expect(named.name).toBe("Welcome");

        type Named = typeof named["name"];

        type cases = [
            Expect<Test<Named, "equals",  string>>,
        ];
    });


    it("anon function can be given name when name is part of props", () => {
        const anon = createFnWithProps(() => "hi", { foo: 42, name: "Foo" });

        expect(anon.name).toBe("Foo");

        type Anon = typeof anon["name"];

        type cases = [
            Expect<Test<Anon, "equals",  "Foo">>,
        ];
    });

    it("named function can be renamed when name is part of props", () => {
        const anon = createFnWithProps(
            function Welcome() { return "hi" },
            { foo: 42, name: "Foo" }
        );

        expect(anon.name).toBe("Foo");

        type Anon = typeof anon["name"];

        type cases = [
            Expect<Test<Anon, "equals",  "Foo">>,
        ];
    });

    it("key/values in original function are retained", () => {
        const original = createFnWithProps(() => "hi" as const, { foo: 42 });

        expect(fnProps(original)).toEqual({ foo: 42 });

        const fn = createFnWithProps(original, { bar: 99 });

        expect(fn.foo).toBe(42);
        expect(fn.bar).toBe(99);
        expect(fn()).toBe("hi");

        type cases = [
            Expect<Test<FnKeyValue<typeof original>, "equals",  { foo: 42 }>>,
            Expect<Equal<
                typeof fn,
                (() => "hi") & { foo: 42; bar: 99 }
            >>
        ];
    });

    it("key/values in original function are retained but new values are retained", () => {
        const original = createFnWithProps(() => "hi", { foo: 42, bar: 50 });
        expect(fnProps(original)).toEqual({ foo: 42, bar: 50 });

        const fn = createFnWithProps(original, { bar: 99 });

        expect(fn.foo).toBe(42);
        expect(fn.bar).toBe(99);
        expect(fn()).toBe("hi");

        type cases = [
            Expect<Test<
                FnKeyValue<typeof original>,
                "equals",
                { foo: 42, bar: 50 }
            >>,
            Expect<Equal<
                typeof fn,
                (() => string) & { foo: 42; bar: 99 }
            >>
        ];
    });

});
