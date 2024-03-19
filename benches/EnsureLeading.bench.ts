import { bench } from "@arktype/attest";
import { EnsureLeading } from "../dist/types/index";

export const test = () => {
  bench("EnsureLeading<hi,'('>", () => {
    return {} as EnsureLeading<"hi", "(">;
  }).types([20, "instantiations"]);

}
