import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ObjectToApi } from "inferred-types/types";
import { handleDoneFn, objectToApi, shape } from "inferred-types/runtime";
import { ObjectApiCallback } from "inferred-types";
type FooBar = { foo: 1; bar?: "hi"; greet: () => `hello` };

describe("ObjectToApi<T>", () => {

  it("happy path", () => {
    type Converted = ObjectToApi<FooBar>;
    type WithDone = ObjectToApi<FooBar, string>;

    // @ts-ignore
    type cases = [
      Expect<Equal<Converted, {
        __kind: "ObjectApi";
        foo: <T extends 1>() => T;
        bar: <T extends "hi" | undefined>() => T;
        greet: () => <T extends () => "hello">() => T;
        done: () => never
      }>>,
      Expect<Equal<WithDone, {
        __kind: "ObjectApi";
        foo: () => 1;
        bar: () => "hi" | undefined;
        greet: () => () => "hello";
        done: () => string
      }>>,
    ];
  });


  it("using runtime's objectToApi()", () => {
    const converted = objectToApi({ foo: 1, bar: "hi", greet: () => `hello` });
    const withDone = objectToApi({ foo: 1, bar: "hi", greet: () => `hello` }, shape(t => t.string())  );

    type Converted = typeof converted;
    type WithDone = typeof withDone;

    // @ts-ignore
    type cases = [
      Expect<Equal<Converted, {
        __kind: "ObjectApi";
        foo: () => 1;
        bar: () => "hi" ;
        greet: () => () => "hello";
        done: () => never
      }>>,
      Expect<Equal<WithDone, {
        __kind: "ObjectApi";
        foo: () => 1;
        bar: () => "hi" ;
        greet: () => () => "hello";
        done: () => string
      }>>,
    ];

  });


});

describe("ObjectApiCallback", () => {

  it("happy path", () => {
    type Obj = {foo: number; bar: string};
    type Api = ObjectToApi<Obj>;

    const instance = objectToApi(
      { foo: 1, bar: "hi", greet: () => `hello` },
      shape(t => t.string())
    );

    const


    const callback = <Instance extends Api>(instance: Instance) =>
      <T extends ObjectApiCallback<Api>>(cb: T) => {
        const api = objectToApi(instance);
        const rtn = cb(api);

        return handleDoneFn(rtn);
    }

  });

});

