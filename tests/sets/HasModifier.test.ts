import { describe, it } from "vitest";
import {
    DefineModifiers,
    Expect,
    HasModifier,
    Test,
} from "inferred-types/types";

describe("HasModifier<T,S>", () => {

    it("positive tests", () => {
        type Modifier = DefineModifiers<["foo","bar","baz"]>;
        type Actual = ["foo","bar","baz"];

        type T1 = HasModifier<"foo", Actual>;
        type T2 = HasModifier<"bar", Actual>;
        type T3 = HasModifier<"baz", Actual>;

        type T4 = HasModifier<"foo", Actual, Modifier>;
        type T5 = HasModifier<"bar", Actual, Modifier>;
        type T6 = HasModifier<"baz", Actual, Modifier>;


        type cases = [
            Expect<Test<Actual, "extends", Modifier>>,
            Expect<Test<
                Modifier, "equals",
                "foo" | "bar" | "baz" | readonly ("foo" | "bar" | "baz")[] | null
            >>,

            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,

            Expect<Test<T1, "equals", true>>,
            Expect<Test<T2, "equals", true>>,
            Expect<Test<T3, "equals", true>>,
        ];
    });


    it("negative tests", () => {
        type Defn = DefineModifiers<["foo","bar","baz"]>;
        type Config = "foo";

        type F1 = HasModifier<"bar", Config, Defn>;
        type F2 = HasModifier<"baz", Config, Defn>;

        type cases = [
            Expect<Test<Config, "extends", Defn>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
        ];
    });

    it("null config", () => {
        type Defn = DefineModifiers<["foo","bar","baz"]>;
        type Config = null;

        type F1 = HasModifier<"bar", Config, Defn>;
        type F2 = HasModifier<"baz", Config, Defn>;
        type F3 = HasModifier<"foo", Config, Defn>;

        type cases = [
            Expect<Test<Config, "extends", Defn>>,

            Expect<Test<F1, "equals", false>>,
            Expect<Test<F2, "equals", false>>,
            Expect<Test<F3, "equals", false>>,
        ];
    });



    it("force invalid modifier (when including modifier defn)", () => {
        type Defn = DefineModifiers<["foo","bar","baz"]>;
        type Config = ["bar","baz"];

        // @ts-expect-error
        type F1 = HasModifier<"f", Config, Defn>;
        type F2 = HasModifier<"foo", Config, Defn>;

        type cases = [
            // type error has to be explicitly ignored
            // as `f` is NOT a part of the definition
            Expect<Test<F1, "equals", false>>,
            // `foo` is part of the definition but not
            // the configuration so it's allowed by
            // the type system because it's part of
            // the definition.
            Expect<Test<F2, "equals", false>>,
        ];
    });


});
