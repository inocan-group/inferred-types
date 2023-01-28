import type { 
  FromTypeDefn,  
  TypeDefaultValue, 
  TypeOptions, 
  TypeUnderlying 
} from "../../../types";

export type TypeApiBoolean = <
    TRequired extends boolean,
    TDesc extends string,
    TUnderlying extends TypeUnderlying,
    TDefaultValue extends TypeDefaultValue<"boolean", TRequired, TUnderlying>,
    TValidations extends readonly any[] | "no-validations", 
>(
  options?: TypeOptions<"boolean", TRequired, TDesc, TUnderlying, TDefaultValue, TValidations>
) => FromTypeDefn<{
  kind: "boolean";
  isRequired: TRequired;
  description: TDesc;
  defaultValue: TDefaultValue;
  validations: TValidations;
}>;

