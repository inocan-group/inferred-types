import { bench } from "@arktype/attest";
import { GreaterThan } from "../dist/inferred-types/index";

export const TARGET = 125;

export const test = () => {
  bench(`GreaterThan<5,8>`, () => {
    return {} as GreaterThan<5,8>;
  }).types([TARGET, "instantiations"]);

  bench(`GreaterThan<8,5>`, () => {
    return {} as GreaterThan<8,5>;
  }).types([TARGET, "instantiations"]);

  bench(`GreaterThan<88,155>`, () => {
    return {} as GreaterThan<88,155>;
  }).types([TARGET, "instantiations"]);

}
