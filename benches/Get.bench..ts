import { bench } from "@arktype/attest";
import { Get } from "../dist/types/index";

export const TARGET = 32000;

export const test = () => {

  bench("Get<foo.bar>", () => {
    return {} as Get<{foo: {bar: 42}}, "foo.bar">;
  }).types([TARGET, "instantiations"]);
}
