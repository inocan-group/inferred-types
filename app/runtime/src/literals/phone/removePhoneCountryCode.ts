import { getPhoneCountryCode, stripLeading } from "src/runtime/index";
import { RemovePhoneCountryCode } from "@inferred-types/types";

export const removePhoneCountryCode = <
  T extends string
>(phone: T) => {
  const countryCode = getPhoneCountryCode(phone) as unknown as string;
  return (
    countryCode !== ""
      ? stripLeading(stripLeading(
          phone.trim(),
          "+","00"
        ) as string, countryCode).trim()
      : phone.trim()
  ) as unknown as RemovePhoneCountryCode<T>
}
