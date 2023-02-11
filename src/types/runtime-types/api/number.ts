import { 
  NoDefaultValue, 
  Type, 
  TypeDefaultValue, 
  TypeOptions, 
  TypeUnderlying 
} from "src/types";

export type TypeApiNumber = <
    TRequired extends boolean = true,
    TDesc extends string = "",
    TUnderlying extends TypeUnderlying = "no-underlying",
    TDefaultValue extends TypeDefaultValue<"number", TRequired, TUnderlying> = NoDefaultValue,
    TValidations extends readonly unknown[] | "no-validations" = "no-validations", 
>(
  options?: TypeOptions<"number", TRequired, TDesc, TUnderlying, TDefaultValue, TValidations>
) => Type<
  "number",
  TRequired extends true ? "required" : "not-required", 
  TDesc, 
  TUnderlying, 
  TDefaultValue extends NoDefaultValue ? "no-default-value" : "with-default-value", 
  TValidations extends "no-validations" ? "no-validations" : "with-validations"
>;
