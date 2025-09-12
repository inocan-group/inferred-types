import { describe, it } from "vitest";
import type { Err, Expect, IT_TakeSet, Test } from "inferred-types/types";

describe("IT_TakeSet<T>", () => {

    it("happy path", () => {
        type Str = IT_TakeSet<"Set<string>">;
        type Expected_Str = {
            __kind: "IT_Token";
            kind: "set";
            token: "Set<string>";
            type: Set<string>;
            rest: "";
        };

        type Union = IT_TakeSet<"Set<string | number>">;
        type Expected_Union = {
            __kind: "IT_Token";
            kind: "set";
            token: "Set<string | number>";
            type: Set<string | number>;
            rest: "";
        }

        type Rec = IT_TakeSet<"Set<Record<string,string>>">;
        type Expected_Rec = {
            __kind: "IT_Token";
            kind: "set";
            token: "Set<Record<string,string>>";
            type: Set<Record<string, string>>;
            rest: "";
        }

        type cases = [
            Expect<Test<Str, "equals", Expected_Str>>,
            Expect<Test<Union, "equals", Expected_Union>>,
            Expect<Test<Rec, "equals", Expected_Rec>>,
        ];
    });

    it("has rest content", () => {
        type Str = IT_TakeSet<"Set<string> | Map<string,number>">;
        type Expected_Str = {
            __kind: "IT_Token";
            kind: "set";
            token: "Set<string>";
            type: Set<string>;
            rest: "| Map<string,number>";
        };

        type cases = [
            Expect<Test<Str, "equals", Expected_Str>>
        ];
    });

    it("invalid interior type", () => {
        type Invalid = IT_TakeSet<"Set<WeakMap<string,string>>">;

        type cases = [
            Expect<Test<Invalid, "extends", Err<"malformed-token">>>
        ];
    });

});
