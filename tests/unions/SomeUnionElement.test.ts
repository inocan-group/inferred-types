import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { UnionToTuple, SomeUnionElement } from "inferred-types/types";
import { describe, it } from "vitest";

describe("SomeUnionElements<TTarget, TOp, TComparator>", () => {
  type D1 = "foo" | 42 | true;
  type D2 = "foo" | number | boolean;


  it("extends comparison", () => {
    type T1 = SomeUnionElement<D1, "extends", number>;
    //   ^? true
    type T2 = SomeUnionElement<D1, "extends", 42>;
    type T3 = SomeUnionElement<D1, "extends", true>;
    type T4 = SomeUnionElement<D1, "extends", boolean>;

    type F1 = SomeUnionElement<D1, "extends", false>;
    type F2 = SomeUnionElement<D1, "extends", 99>;
    type F3 = SomeUnionElement<D1, "extends", false>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });

  it("extends comparison on a non-union target", () => {
    type T1 = SomeUnionElement<42, "extends", number>;
    type T2 = SomeUnionElement<string, "extends", string>;
    type T3 = SomeUnionElement<"foo", "extends", string>;

    type F1 = SomeUnionElement<42, "extends", string>;
    type F2 = SomeUnionElement<string, "extends", boolean>;
    type F3 = SomeUnionElement<42, "extends", 99>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });


  it("extends works when boolean is part of union", () => {
    type U = UnionToTuple<string | boolean>;
    type T1 = SomeUnionElement<string | boolean, "extends", string>;
    //   ^?
    type T2 = SomeUnionElement<string | boolean, "extends", boolean>;
    //   ^?

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
    ];
  });


  it("equals comparison", () => {
    type T1 = SomeUnionElement<number, "equals", number>;
    type T2 = SomeUnionElement<number | "bar", "equals", number>;
    type T3 = SomeUnionElement<D1, "equals", true>;
    type T4 = SomeUnionElement<D2, "equals", boolean>;

    type F1 = SomeUnionElement<D1, "equals", false>;
    type F2 = SomeUnionElement<D1, "equals", 99>;
    type F3 = SomeUnionElement<D1, "equals", false>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });


  it("startsWith comparison", () => {
    type T1 = SomeUnionElement<"_foo" | "_bar", "startsWith", "_">;
    type T2 = SomeUnionElement<"_foo" | "bar", "startsWith", "_">;

    type F1 = SomeUnionElement<"foo_" | "bar_", "startsWith", "_">;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,

      ExpectFalse<F1>
    ];
  });

  it("endsWith comparison", () => {
    type T1 = SomeUnionElement<"foo_" | "bar_", "endsWith", "_">;
    type T2 = SomeUnionElement<"foo_" | "bar", "endsWith", "_">;

    type F1 = SomeUnionElement<"foo" | "bar", "endsWith", "_">;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,

      ExpectFalse<F1>
    ];
  });
});
