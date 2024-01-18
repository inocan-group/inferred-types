import { bench } from "@arktype/attest";
import { LessThan } from "../dist/inferred-types/index";

export const TARGET = 125;

export const test = () => {
  bench(`LessThan<5,8>`, () => {
    return {} as LessThan<5,8>;
  }).types([TARGET, "instantiations"]);

  bench(`LessThan<8,5>`, () => {
    return {} as LessThan<8,5>;
  }).types([TARGET, "instantiations"]);

  bench(`LessThan<88,155>`, () => {
    return {} as LessThan<88,155>;
  }).types([TARGET, "instantiations"]);

}
