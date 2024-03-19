import { bench } from "@arktype/attest";
import { AsArray } from "../dist/types/index";

export const test = () => {
  bench("AsArray<['hi']>", () => {
    return {} as AsArray<["hi"]>;
  }).types([20, "instantiations"]);

  bench("AsArray<'hi'>", () => {
    return {} as AsArray<"hi">;
  }).types([128, "instantiations"]);
}
