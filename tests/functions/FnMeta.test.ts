import {  Expect, FnMeta, Test } from "inferred-types/types";
import { describe, it } from "vitest";


describe("FnMeta<T>", () => {

    it("identity function", () => {
        type Identity = FnMeta<() => "hi">;

        type cases = [
            Expect<Test<
                Identity, "equals",
                {
                    fn: () => "hi";
                    returns: "hi";
                    params: [];
                    props: {};
                    hasProps: false;
                    hasParams: false;
                    kind: "identity"
                }
            >>
        ];
    });


    it("static function with parameters", () => {
        type T = FnMeta<(name: string, age: number) => `Hi ${typeof name}, you are ${typeof age} years old`>;

        type cases = [
            Expect<Test<
                T, "equals",
                {
                    fn: (name: string, age: number) => `Hi ${typeof name}, you are ${typeof age} years old`;
                    params: [name: string, age: number];
                    returns: `Hi ${string}, you are ${number} years old`;
                    props: {};
                    hasProps: false;
                    hasParams: true;
                    kind: "static"
                }
            >>
        ];
    });


    it("narrowing function with params", () => {
        type T1 = FnMeta<<TName extends string, TAge extends number>(name: TName, age: TAge) => `Hi ${typeof name}, you are ${typeof age} years old`>;
        type T2 = FnMeta<<TName extends string, TAge extends number>(name: TName, age: TAge) => `Hi ${TName}, you are ${TAge} years old`>;

        type cases = [
            Expect<Test<
                T1, "equals",
                {
                    fn: <TName extends string, TAge extends number>(name: TName, age: TAge) => `Hi ${typeof name}, you are ${typeof age} years old`;
                    params: [name: string, age: number];
                    returns: `Hi ${string}, you are ${number} years old`;
                    props: {};
                    hasProps: false;
                    hasParams: true;
                    kind: "narrowing";
                }
            >>,
            Expect<Test<
                T2, "equals",
                {
                    fn: <TName extends string, TAge extends number>(name: TName, age: TAge) => `Hi ${TName}, you are ${TAge} years old`;
                    params: [name: string, age: number];
                    returns: `Hi ${string}, you are ${number} years old`;
                    props: {};
                    hasProps: false;
                    hasParams: true;
                    kind: "narrowing";
                }
            >>
        ];
    });



    it("TArgs (not readonly)", () => {
        type T1 = FnMeta<<TArgs extends [string, number]>(...args: TArgs) => `Hi ${TArgs[0]}, you are ${TArgs[1]} years old`>;

        type cases = [
            Expect<Test<
                T1, "equals",
                {
                    fn: <TArgs extends [string, number]>(...args: TArgs) => `Hi ${TArgs[0]}, you are ${TArgs[1]} years old`;
                    params: [string, number];
                    returns: `Hi ${string}, you are ${number} years old`;
                    props: {};
                    hasProps: false;
                    hasParams: true;
                    kind: "static";
                }
            >>
        ];
    });

    it("TArgs (readonly)", () => {
        type T1 = FnMeta<<TArgs extends readonly [string, number]>(...args: TArgs) => `Hi ${TArgs[0]}, you are ${TArgs[1]} years old`>;

        type cases = [
            Expect<Test<
                T1, "equals",
                {
                    fn: <TArgs extends readonly [string, number]>(...args: TArgs) => `Hi ${TArgs[0]}, you are ${TArgs[1]} years old`;
                    params: [string, number];
                    returns: `Hi ${string}, you are ${number} years old`;
                    props: {};
                    hasProps: false;
                    hasParams: true;
                    kind: "narrowing";
                }
            >>
        ];
    });


})
