import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { GetQueryParameterDynamics, GetUrlPathDynamics } from "inferred-types/types";

describe("GetUrlPathDynamics<T>", () => {

  it("happy path", () => {
    type Nothing = GetUrlPathDynamics<"https://foo.com/path">;
    type DynPath = GetUrlPathDynamics<"https://foo.com/<action>/<id>">;
    type TypedDynPath = GetUrlPathDynamics<
      "/base/<type as string(foo,bar)>/<id as number>/<user>/"
    >;
    type TypedDynPath2 = GetUrlPathDynamics<
      "/base/<id as number>/<user>/<type as string(foo,bar)>"
    >;
    type TypedDynPath3 = GetUrlPathDynamics<
      "/base/<id>/<user>/<type as string(foo,bar)>"
    >;
    type TypedDynPath4 = GetUrlPathDynamics<
      "/base/<id>/<type as string(foo,bar)>/<user>"
    >;

    // @ts-ignore
    type cases = [
      Expect<Equal<Nothing, {}>>,
      Expect<Equal<DynPath, { action: string; id: string }>>,
      Expect<Equal<TypedDynPath, { id: number; user: string; type: "foo" | "bar" }>>,
      Expect<Equal<TypedDynPath2, { id: number; user: string; type: "foo" | "bar" }>>,
      Expect<Equal<TypedDynPath3, { id: string; user: string; type: "foo" | "bar" }>>,
      Expect<Equal<TypedDynPath4, { id: string; user: string; type: "foo" | "bar" }>>,
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
      Expect<Equal<Nothing, {}>>,
      Expect<Equal<Nothing2, {}>>,
      Expect<Equal<DynPathWithQp, { foo: number; bar: string }>>,
      Expect<Equal<StaticAndDynamic, { foo: number; bar: "howdy" }>>,
      Expect<Equal<Unionized, { foo: "foo" | "bar" }>>,
    ]

  });

});
