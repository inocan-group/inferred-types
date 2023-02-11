import { NoDefaultValue } from "../../../types";
import { Type, TypeDefaultValue, TypeOptions, TypeUnderlying } from "../Type";

export type TypeApiString = <
    TRequired extends boolean = true,
    TDesc extends string = "",
    TUnderlying extends TypeUnderlying = "no-underlying",
    TDefaultValue extends TypeDefaultValue<"string", TRequired, TUnderlying> = NoDefaultValue,
    TValidations extends readonly unknown[] | "no-validations" = "no-validations", 
>(
  options?: TypeOptions<"string", TRequired, TDesc, TUnderlying, TDefaultValue, TValidations>
) => Type<
  "string",
  TRequired extends false ? "not-required" : "required", 
  TDesc, 
  TUnderlying, 
  TDefaultValue extends NoDefaultValue ? "no-default-value" : "with-default-value", 
  TValidations extends "no-validations" ? "no-validations" : "with-validations"
>;

