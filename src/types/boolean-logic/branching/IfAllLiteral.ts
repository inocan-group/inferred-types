import { Tuple } from "../../base-types";
import { AllLiteral } from "../operators";

/**
 * **IfAllLiteral**`<TTuple,IF,ELSE>`
 * 
 * Branching utility which branches on whether the tuple passed in
 * has _literal_ values for every member.
 */
export type IfAllLiteral<TTuple extends Tuple, IF, ELSE> =
AllLiteral<TTuple> extends true
  ? IF
  : ELSE;
