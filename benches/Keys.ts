import { bench } from "@arktype/attest";
import { Keys } from "../dist/inferred-types/index";

export const test = () => {
  bench(`Keys<{foo: 1; bar: 2; baz: 3}>`, () => {
    return {} as Keys<{foo: 1; bar: 2; baz: 3}>;
  }).types([768, "instantiations"]);
}
