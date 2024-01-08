import type { 
  Digit, 
  TypeOptions, 
  IfReadonlyArray, 
  AlphaNumericChar,
  LowerAlphaChar, 
  UpperAlphaChar, 
  Narrowable,
  FromTypeDefn, 
  TypeDefaultValue,
} from "../..";

export type StringLiteralMapper = {
  "<string>": `${string}`;
  "<number>": `${number}`;
  "<boolean>": `${boolean}`;
  "<digit>": `${Digit}`;
  "<letter>": `${AlphaNumericChar}`;
  "<letter:lowercase>": `${LowerAlphaChar}`;
  "<letter:uppercase>": `${UpperAlphaChar}`;
};

// const matchers = [
//   createTypeMatcher("equals", "<number>", (v) => v as unknown as `${number}`),
//   createTypeMatcher("equals", "<boolean>", (v) => v as unknown as `${boolean}`),
//   createTypeMatcher("equals", "<digit>", (v) => v as unknown as `${Digit}`),
//   createTypeMatcher("equals", "<letter>", (v) => v as unknown as `${AlphaNumericChar}`),
//   createTypeMatcher("equals", "<letter:lowercase>", (v) => v as unknown as `${LowerAlpha}`),
//   createTypeMatcher("equals", "<letter:uppercase>", (v) => v as unknown as `${UpperAlpha}`),
//   createTypeMatcher("startsWith", "literal:", <V extends string>(v: V) => stripLeading(v, "literal:")),
// ];


type ToUnderlying<T extends Narrowable> = IfReadonlyArray<
  T, T & readonly unknown[], readonly [T]
>;

export type TypeApiStringLiteral = <
  TRequired extends boolean,
  TDesc extends string,
  // a single string literal, an array of readonly strings, 
  TUnderlying extends Narrowable[],
  TDefaultValue extends TypeDefaultValue<"stringLiteral", TRequired, ToUnderlying<TUnderlying>>,
  TValidations extends readonly unknown[] | "no-validations",
>(
  defn: TUnderlying,
  options?: TypeOptions<
    "stringLiteral", TRequired, TDesc, ToUnderlying<TUnderlying>, TDefaultValue, TValidations
  >
) => FromTypeDefn<{
  kind: "stringLiteral";
  isRequired: TRequired;
  description: TDesc;
  underlying: ToUnderlying<TUnderlying>;
  defaultValue: TDefaultValue;
  validations: TValidations;
}>;
