import { Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import {
  DoesExtend,
  IndexableObject,
  EmptyObject,
  DoesNotExtend,
  Something,
  Nothing,
  Scalar,
  ExplicitlyEmptyObject,
} from "inferred-types/types";



describe("EmptyObject", () => {

  it("positive tests", () => {
    type StringKeyed = Record<string, string>;
    type SymKeyed = Record<symbol, string>;
    const empty = {};
    type ViaRuntime = typeof empty;
    const explicitEmpty: EmptyObject = {};
    type ViaRuntime2 = typeof explicitEmpty;

    type cases = [
      // an empty object still must be "something"
      Expect<DoesExtend<EmptyObject, Something>>,
      // in fact, it must extends the "Object" interface
      Expect<DoesExtend<EmptyObject, object>>,
      // it also extends an object with only string keys but with `never` as the value
      Expect<DoesExtend<EmptyObject, StringKeyed>>,
      // same applies to a symbol keyed object
      Expect<DoesExtend<EmptyObject, SymKeyed>>,
      Expect<DoesExtend<EmptyObject, ViaRuntime>>,
      Expect<DoesExtend<EmptyObject, ViaRuntime2>>,
    ];


  });

  it("negative tests", () => {

    const foo = { foo: 42 };
    type Foo = typeof foo;

    type FooBar = IndexableObject<{ foo: string; bar: string }>;

    type cases = [
      // must be Something, therefore can not extend Nothing
      Expect<DoesNotExtend<EmptyObject, Nothing>>,
      // can not extends scalar types
      Expect<DoesNotExtend<EmptyObject, Scalar>>,
      // and while it can extend the generic Object interface
      // it must not have any values other than `never`
      Expect<DoesNotExtend<EmptyObject, Foo>>,

      // furthermore, a union of an `IndexableObject`
      Expect<DoesNotExtend<EmptyObject, Foo & EmptyObject>>,
      Expect<DoesNotExtend<EmptyObject, IndexableObject<Foo>>>,
      Expect<DoesNotExtend<FooBar, ExplicitlyEmptyObject>>,

      // an Object is a superset of
      Expect<DoesNotExtend<object, ExplicitlyEmptyObject>>,
      // compared to an indexable object
      Expect<DoesNotExtend<IndexableObject, ExplicitlyEmptyObject>>,
    ];


  });


});

