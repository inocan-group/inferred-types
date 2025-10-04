import { describe, it } from "vitest";
import type { Expect, GetQueryParameterDynamics, GetUrlDynamics, GetUrlPathDynamics, IsErrMsg, Test } from "inferred-types/types";

describe("GetUrlPathDynamics<T>", () => {

  it("happy path", () => {
    type Nothing = GetUrlPathDynamics<"https://foo.com/path">;
    type DynPath = GetUrlPathDynamics<"https://foo.com/<action>/<id>">;
    type TypedDynPath = GetUrlPathDynamics<
      "/base/<type as string(foo,bar)>/<id as number>/<user>/"
    >;
    type TypedDynPath2 = GetUrlPathDynamics<
      "/base/<id as number>/<user>/<type>"
    >;
    type TypedDynPath3 = GetUrlPathDynamics<
      "/base/<id>/<user>/<type as string(foo,bar)>"
    >;
    type TypedDynPath4 = GetUrlPathDynamics<
      "/base/<id>/<type as string(foo,bar)>/<user>"
    >;

    // @ts-ignore
    type cases = [
      Expect<Test<Nothing, "equals",  {}>>,
      Expect<Test<DynPath, "equals",  { action: string; id: string }>>,
      Expect<Test<TypedDynPath, "equals",  { id: number; user: string; type: "foo" | "bar" }>>,
      Expect<Test<TypedDynPath2, "equals",  { id: number; user: string; type: string }>>,
      Expect<Test<TypedDynPath3, "equals",  { id: string; user: string; type: "foo" | "bar" }>>,
      Expect<Test<TypedDynPath4, "equals",  { id: string; user: string; type: "foo" | "bar" }>>,
    ];
  });

});

describe("GetQueryParameterDynamics<T>", () => {

  it("happy path", () => {
    type Nothing = GetQueryParameterDynamics<"https://foo.com/path">;
    type Nothing2 = GetQueryParameterDynamics<"https://foo.com/<action>/<id>">;
    type DynPathWithQp = GetQueryParameterDynamics<
      "https://foo.com/<action>/<id>?foo=<number>&bar=<string>"
    >;
    type StaticAndDynamic = GetQueryParameterDynamics<
      `?foo=<number>&bar=howdy`
    >;
    type Unionized = GetQueryParameterDynamics<
      `?foo=<string(foo,bar)>`
    >;

    // @ts-ignore
    type cases = [
      Expect<Test<Nothing, "equals",  {}>>,
      Expect<Test<Nothing2, "equals",  {}>>,
      Expect<Test<DynPathWithQp, "equals",  { foo: number; bar: string }>>,
      Expect<Test<StaticAndDynamic, "equals",  { foo: number; bar: "howdy" }>>,
      Expect<Test<Unionized, "equals",  { foo: "foo" | "bar" }>>,
    ]

  });

});

describe("GetUrlDynamics", () => {

  it("happy path", () => {
    type T1 = GetUrlDynamics<
      "https://foo.com/<action>/<id>?foo=<number>&bar=<string>"
    >;
    type Path = T1["pathVars"];
    type Qp = T1["qpVars"];
    type All = T1["allVars"];

    // @ts-ignore
    type cases = [
      Expect<Test<Path, "equals",  { id: string; action: string}>>,
      Expect<Test<Qp, "equals",  { foo: number; bar: string}>>,
      Expect<Test<
        All, "equals",
        { id: string; action: string;  foo: number; bar: string}
    >>,
    ];
  });

  it("overlapping keys", () => {
    type T1 = GetUrlDynamics<
      "https://foo.com/<id>/<bar>?foo=<number>&bar=<string>"
    >;
    type Path = T1["pathVars"];
    type Qp = T1["qpVars"];
    type All = T1["allVars"];

    // @ts-ignore
    type cases = [
      Expect<Test<Path, "equals",  { id: string; bar: string}>>,
      Expect<Test<Qp, "equals",  { foo: number; bar: string}>>,
      Expect<Test<IsErrMsg<All, "overlapping-keys">, "equals", true>>,
    ];
  });

});

