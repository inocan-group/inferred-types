
import { NoDefaultValue } from "../../../types";
import { Type, TypeDefaultValue, TypeOptions, TypeUnderlying } from "../Type";

export type TypeApiNumericLiteral = <
TRequired extends boolean = true,
TDesc extends string = "",
TUnderlying extends TypeUnderlying = "no-underlying",
TDefaultValue extends TypeDefaultValue<"stringLiteral", TRequired, TUnderlying> = NoDefaultValue,
TValidations extends readonly unknown[] | "no-validations" = "no-validations", 
>(
  literal: TUnderlying extends readonly string[] 
    ? TUnderlying 
    : never, 
  options?: TypeOptions<"numericLiteral",TRequired, TDesc, TUnderlying, TDefaultValue, TValidations>
) => Type<
  "numericLiteral",
  TRequired extends true ? "required" : "not-required", 
  TDesc, 
  TUnderlying, 
  TDefaultValue extends NoDefaultValue ? "no-default-value" : "with-default-value", 
  TValidations extends "no-validations" ? "no-validations" : "with-validations"
>;
