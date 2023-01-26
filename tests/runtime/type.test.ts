import { describe, it } from "vitest";
import type { Expect, Equal, ExpectExtends } from "@type-challenges/utils";
import { box } from "src/runtime";
import { FromTypeDefn, Type, TypeDefn, TypeHasDefaultValue, TypeIsRequired, TypeKind, TypeUnderlying } from "types/runtime-types";
import { NoDefaultValue } from "types/constants";
import { DoesExtend } from "src/types";
import { type } from "runtime/runtime/type";
import { TypeApi } from "types/runtime-types/api";

describe("testing type() utility and some pre-made conditions", () => {

  it("creating TypeDefn's", () => {
    const builder = <K extends TypeKind, R extends boolean, D extends string, T extends TypeDefn<K, R, D>>(type: T) => type;
    const t1 = builder({ kind: "string" });
    const t2 = builder({ kind: "string", isRequired: true });
    const t3 = builder({ kind: "number", isRequired: true });
    const t4 = builder({ kind: "number", isRequired: false });
    const t5 = builder({ kind: "string", isRequired: true, description: "hi" });

    type cases = [
      // strings
      Expect<Equal<
        DoesExtend<typeof t1, TypeDefn<"string", true>>,
        true
      >>,
      Expect<Equal<
        DoesExtend<typeof t2, TypeDefn<"string", true>>,
        true
      >>,
      // numbers
      Expect<Equal<
        DoesExtend<typeof t3, TypeDefn<"number", true>>,
        true
      >>,
      Expect<Equal<
        DoesExtend<typeof t4, TypeDefn<"number", false>>,
        true
      >>,
      Expect<Equal<
        DoesExtend<typeof t5, TypeDefn<"string", true, "hi">>,
        true
      >>,
    ];
    const cases: cases = [true, true, true, true, true];

  });


  it("FromTypeDefn<T> utility", () => {
    type S1 = TypeDefn<"string", true, "my description", "no-underlying", NoDefaultValue, "no-validations">;
    type N1 = TypeDefn<"number", true, "a number", "no-underlying", NoDefaultValue, "no-validations">;
    type N2 = TypeDefn<"number", false, "a number", "no-underlying", NoDefaultValue, "no-validations">;
    type S2 = TypeDefn<"string">;

    type TS1 = FromTypeDefn<S1>;
    type TN1 = FromTypeDefn<N1>;
    type TN2 = FromTypeDefn<N2>;
    type TS2 = FromTypeDefn<S2>;

    type cases = [
      Expect<ExpectExtends<
        Type<"string", "required", "my description", "no-underlying", "no-default-value", "no-validations">,
        TS1
      >>,
      Expect<ExpectExtends<
        Type<"number", "required", "a number", "no-underlying", "no-default-value", "no-validations">,
        TN1
      >>,
      Expect<ExpectExtends<
        Type<"number", "not-required", "a number", "no-underlying", "no-default-value", "no-validations">,
        TN2
      >>,
      // check resultant types
      Expect<Equal<TS1["type"], string>>,
      Expect<Equal<TN1["type"], number>>,
      Expect<Equal<TN2["type"], number | undefined>>,
      Expect<Equal<TS2["type"], string>>,
    ];
    const cases: cases = [true, true, true, true, true, true, true];
  });


  it("defining type with a TypeDefn dictionary", () => {
    const s1 = type({ kind: "string" });
    const s2 = type({ kind: "string", isRequired: true });
    const s3 = type({ kind: "string", isRequired: false });
    const s4 = type({ kind: "string", isRequired: false, defaultValue: box("hi") });
    const s5 = type({ kind: "string", isRequired: false, description: "hello" });

    type ReqString = Type<"string", "required", "", "no-underlying", "no-default-value", "no-validations">;
    type NotReqString<Desc extends string = "", DefVal extends TypeHasDefaultValue = "no-default-value"> = Type<"string", "not-required", Desc, "no-underlying", DefVal, "no-validations">;

    type cases = [
      Expect<Equal<typeof s1, ReqString>>,
      Expect<Equal<typeof s2, ReqString>>,
      Expect<Equal<typeof s3, NotReqString>>,
      Expect<Equal<typeof s4, NotReqString<"", "with-default-value">>>,
      Expect<Equal<typeof s5, NotReqString<"hello">>>,
    ];

    const cases: cases = [true, true, true, true, true];
  });


  it("use of TypeApi works as expected type wise", () => {
    const api = null as unknown as TypeApi; // fake implementation
    const b2 = api.boolean({ isRequired: false });
    const b1 = api.boolean();
    const s1 = api.string({ description: "i am a string" });
    const s2 = api.string({ defaultValue: box("foo") });
    const l1 = api.stringLiteral(["foo", "bar", "baz"] as ["foo", "bar", "baz"]);

    type Expected<
      K extends TypeKind,
      R extends TypeIsRequired = "required",
      D extends string = "",
      U extends TypeUnderlying = "no-underlying",
      Val extends TypeHasDefaultValue = "no-default-value"
    > = Type<K, R, D, U, Val, "no-validations">;

    type cases = [
      Expect<Equal<typeof b1, Expected<"boolean">>>,
      Expect<Equal<typeof b2, Expected<"boolean", "not-required">>>,
      Expect<Equal<typeof s1, Expected<"string", "required", "i am a string">>>,
      Expect<Equal<
        typeof s2,
        Expected<"string", "required", "", "no-underlying", "with-default-value">
      >>,
      Expect<Equal<
        typeof l1,
        Expected<"stringLiteral", "required", "", ["foo", "bar", "baz"] & readonly any[]>
      >>,
    ];
    const cases: cases = [true, true, true, true, true];
  });
});
