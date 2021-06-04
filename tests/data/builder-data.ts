import { Builder, BuilderApi } from "~/Builder";
import { isNonNullObject } from "common-types";
import { TypeGuard } from "~/types";


export type BuilderState = { foo: number; bar: number; baz?: string };

const endpoint = BuilderApi<BuilderState>();
const f0 = endpoint("setFoo", (s) => (n: number) => ({
  ...s,
  foo: n,
}));

const f1 = endpoint("incFoo", (s) => () => ({
  ...s,
  foo: s.foo !== undefined ? s.foo + 1 : 1,
}));
const f2 = endpoint("decFoo", (s) => () => ({
  ...s,
  foo: s.foo !== undefined ? s.foo - 1 : 0,
}));
const f3 = endpoint("setBar", (s) => (n: number) => ({
  ...s,
  bar: n,
}));
const f4 = endpoint("incBar", (s) => () => ({
  ...s,
  bar: s.bar !== undefined ? s.bar + 1 : 1,
}));
const f5 = endpoint("setBaz", (s) => (m: string) => ({
  ...s,
  baz: m,
}));

const tg: TypeGuard<BuilderState> = (input: unknown): input is BuilderState => {
  return (
    isNonNullObject(input) &&
    typeof (input as BuilderState).foo === "number" &&
    typeof (input as BuilderState).bar === "number"
  );
};

/**
 * Creates a builder initialized to the state passed in.
 * This builder has foo, bar, and optionally a baz property
 */
export function createBuilder<T extends Partial<BuilderState>>(s: T) {
  return Builder(tg, { ...f0, ...f1, ...f2, ...f3, ...f4, ...f5 })(s);
}

export function createStateIdentityApi() {
  return { ...f0, ...f1, ...f2, ...f3, ...f4, ...f5 };
}