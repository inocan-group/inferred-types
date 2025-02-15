import { Equal, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { IsUnion } from "inferred-types";
import { EveryUnionElement, SomeUnionElement } from "inferred-types/types";
import { describe, it } from "vitest";

describe("EveryUnionElement<TTarget, TOp, TComparator>", () => {
  type D1 = "foo" | 42 | true;
  type D2 = "foo" | number | boolean;


  it("extends comparison", () => {
    type T1 = EveryUnionElement<1 | 2 | 3, "extends", number>;
    type T2 = EveryUnionElement<42, "extends", 42>;
    type T3 = EveryUnionElement<"foo" | "bar", "extends", string>;
    type T4 = EveryUnionElement<false, "extends", boolean>;

    type F1 = EveryUnionElement<D1, "extends", false>;
    type F2 = EveryUnionElement<D1, "extends", 99>;
    type F3 = EveryUnionElement<D1, "extends", false>;

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
    type T1 = EveryUnionElement<42, "extends", number>;
    type T2 = EveryUnionElement<string, "extends", string>;
    type T3 = EveryUnionElement<"foo", "extends", string>;

    type F1 = EveryUnionElement<42, "extends", string>;
    type F2 = EveryUnionElement<string, "extends", boolean>;
    type F3 = EveryUnionElement<42, "extends", 99>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });

  it("equals comparison", () => {
    type T1 = EveryUnionElement<number, "equals", number>;
    type T2 = EveryUnionElement<"foo", "equals", "foo">;
    type T4 = EveryUnionElement<D2, "equals", boolean>;

    type F1 = EveryUnionElement<D1, "equals", "foo">;
    type F2 = EveryUnionElement<D1, "equals", 42>;
    type F3 = EveryUnionElement<D1, "equals", true>;
    type F4 = EveryUnionElement<"foo", "equals", string>;

    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T4>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
      ExpectFalse<F4>,
    ];
  });

  it("startsWith comparison", () => {
    type T1 = EveryUnionElement<"_foo" | "_bar", "startsWith", "_">;
    type F1 = EveryUnionElement<"_foo" | "bar", "startsWith", "_">;

    type cases = [
      ExpectTrue<T1>,
      ExpectFalse<F1>
    ];
  });

  it("endsWith comparison", () => {
    type T1 = EveryUnionElement<"foo_" | "bar_", "endsWith", "_">;
    type F1 = EveryUnionElement<"foo_" | "bar", "startsWith", "_">;

    type cases = [
      ExpectTrue<T1>,
      ExpectFalse<F1>
    ];
  });

});
