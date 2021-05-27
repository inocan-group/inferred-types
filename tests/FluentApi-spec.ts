import type { Expect, Equal, ExpectExtends, ExpectFalse } from "@type-challenges/utils";
import { FluentApi, Keys } from "~/types";

const escape = {
  hi: () => "hello",
};
const fluent = {
  foo: () => ({ ...fluent, ...escape }),
  bar: () => ({ ...fluent, ...escape }),
};
const fluentSolo = {
  foo: () => fluentSolo,
  bar: () => fluentSolo,
};

describe("FluentApi type", () => {
  it("Fluent API without escape API can be used as FluentAPI", () => {
    const api: FluentApi<typeof fluentSolo> = fluentSolo;
    type Api = typeof api;

    type cases = [
      // Api extends the type FluentApi
      Expect<ExpectExtends<FluentApi<any, any, any>, Api>>,
      // the fluent API keys are found on API
      Expect<ExpectExtends<Keys<Api>, "foo" | "bar">>,
      // the fluent API returns itself
      Expect<Equal<Api, ReturnType<Api["bar"]>>>,
      Expect<Equal<Api, ReturnType<Api["foo"]>>>
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("Simple fluent API and escape API are combined", () => {
    const api: FluentApi<typeof fluent, typeof escape> = { ...fluent, ...escape };
    type Api = typeof api;

    type cases = [
      // Api extends the type FluentApi
      Expect<ExpectExtends<FluentApi<any, any, any>, Api>>,
      // the fluent and escape api keys are found on API
      Expect<ExpectExtends<Keys<Api>, "foo" | "bar" | "hi">>,
      // the fluent API returns itself
      Expect<Equal<Api, ReturnType<Api["bar"]>>>,
      Expect<Equal<Api, ReturnType<Api["foo"]>>>,
      // whereas the escape API just returns a string
      Expect<Equal<string, ReturnType<Api["hi"]>>>
    ];
    const cases: cases = [true, true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("Exclusion masks certain API endpoints", () => {
    const api1: FluentApi<typeof fluent, typeof escape, "hi"> = { ...fluent, ...escape };
    type Api1 = typeof api1;
    const api2: FluentApi<typeof fluent, typeof escape, "foo" | "bar"> = { ...fluent, ...escape };
    type Api2 = typeof api2;

    type cases = [
      // excluding "hi" hides the escape api but leaves fluent API untouched
      Expect<ExpectExtends<"foo" | "bar", Keys<Api1>>>,
      ExpectFalse<ExpectExtends<"hi", Keys<Api1>>>,
      // similarly hiding "foo" and "bar" leaves the escape API untouched
      Expect<ExpectExtends<"hi", Keys<Api2>>>,
      ExpectFalse<ExpectExtends<"foo" | "bar", Keys<Api2>>>
    ];

    const cases: cases = [true, false, true, false];
    expect(cases).toBe(cases);
  });

  it("applying different FluentApi exclusions to the same runtime API modifies the API appropriately", () => {
    const api1: FluentApi<typeof fluent, typeof escape, "hi"> = { ...fluent, ...escape };
    type Api1 = typeof api1;
    const api2: FluentApi<typeof fluent, typeof escape, "foo" | "bar"> = api1 as any;
    type Api2 = typeof api2;

    type cases = [
      // excluding "hi" hides the escape api but leaves fluent API untouched
      Expect<ExpectExtends<"foo" | "bar", Keys<Api1>>>,
      ExpectFalse<ExpectExtends<"hi", Keys<Api1>>>,
      // similarly hiding "foo" and "bar" leaves the escape API untouched
      Expect<ExpectExtends<"hi", Keys<Api2>>>,
      ExpectFalse<ExpectExtends<"foo" | "bar", Keys<Api2>>>
    ];

    const cases: cases = [true, false, true, false];
    expect(cases).toBe(cases);
  });
});
