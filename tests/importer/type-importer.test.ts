/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Expect, Equal } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {
  Suggest,
  HasRequiredProps,
  RequiredKeysTuple,
  IsWideContainer
} from "inferred-types";
import {
  Suggest as SuggestType,
  HasRequiredProps as HasRequiredPropsType,
  RequiredKeysTuple as RequiredKeysTupleType,
  IsWideContainer as IsWideContainerType,
} from "inferred-types/types";


describe("type importer", () => {

  it("Suggest<T> util from 'inferred-types'", () => {
    type T = Suggest<"foo" | "bar">;

    // @ts-ignore
    type _cases = [
      Expect<Equal<T, "foo" | "bar" | (string & {})>>,
    ]
  });


  it("Suggest<T> util from types map", () => {
    type T = SuggestType<"foo" | "bar">;

    // @ts-ignore
    type _cases = [
      Expect<Equal<T, "foo" | "bar" | (string & {})>>,
    ]
  });

  it("IsWideContainer<T> util from 'inferred-types'", () => {
    type T = IsWideContainer<object>;
    type T2 = IsWideContainer<Record<string,string>>;
    type F = IsWideContainer<{ foo?: 42 }>;

    // @ts-ignore
    type _cases = [
      Expect<Equal<T, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<F, false>>,
    ]
  });

  it("IsWideContainer<T> util from 'inferred-types/types'", () => {
    type T = IsWideContainerType<object>;
    type T2 = IsWideContainerType<Record<string,string>>;
    type F = IsWideContainerType<{ foo?: 42 }>;

    // @ts-ignore
    type _cases = [
      Expect<Equal<T, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<F, false>>,
    ]
  });

  it("RequiredKeysTuple<T> util from 'inferred-types'", () => {
    type Foo = RequiredKeysTuple<{ foo: 42 }>;
    type None = RequiredKeysTuple<{ foo?: 42; bar?: 99 }>;

    // @ts-ignore
    type _cases = [
      Expect<Equal<Foo, [ "foo" ]>>,
      Expect<Equal<None, []>>,
    ]
  });

  it("RequiredKeysTuple<T> util from 'inferred-types/types'", () => {
    type T = RequiredKeysTupleType<{ foo: 42 }>;
    type F = RequiredKeysTupleType<{ foo?: 42 }>;

    // @ts-ignore
    type _cases = [
      Expect<Equal<T, [ "foo" ]>>,
      Expect<Equal<F, []>>,
    ]
  });

  it("HasRequiredProps<T> util from 'inferred-types'", () => {
    type T = HasRequiredProps<{ foo: 42 }>;
    type F = HasRequiredProps<{ foo?: 42 }>;

    // @ts-ignore
    type _cases = [
      Expect<Equal<T, true>>,
      Expect<Equal<F, false>>,
    ]
  });

  it("HasRequiredProps<T> util from 'inferred-types'", () => {
    type T = HasRequiredPropsType<{ foo: 42 }>;
    type F = HasRequiredPropsType<{ foo?: 42 }>;

    // @ts-ignore
    type _cases = [
      Expect<Equal<T, true>>,
      Expect<Equal<F, false>>,
    ]
  });


});
