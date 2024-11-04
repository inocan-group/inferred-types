import { NUMERIC_CHAR } from "@inferred-types/constants";
import { GetPhoneCountryCode } from "@inferred-types/types";
import { retainWhile, stripLeading } from "@inferred-types/runtime";

export const getPhoneCountryCode = <T extends string>(
  phone: T
) => {
  return (
    phone.trim().startsWith("+") || phone.trim().startsWith("00")
      ? retainWhile(
          stripLeading(stripLeading(phone.trim(),"+"), "00") as string,
          ...NUMERIC_CHAR
        ) as string
      : "" as string
  ) as unknown as GetPhoneCountryCode<T>;
}
