import { GetCountryPhoneNumber, GetPhoneCountryCode, PhoneFormat, PhoneNumber } from "src/types/index";
import { isPhoneNumber, retainWhile, stripLeading } from "src/runtime/index";
import { NUMERIC_CHAR } from "src/constants/NumericChar";


export const getPhoneCountryCode = <T extends string>(
  phone: T
) => {
  return (
    phone.trim().startsWith("+") || phone.trim().startsWith("00")
      ? retainWhile(
          stripLeading(stripLeading(phone.trim(),"+"), "00"),
          ...NUMERIC_CHAR
        ) as string
      : "" as string
  ) as unknown as GetPhoneCountryCode<T>;
}

export const getCountryPhoneNumber = <
  T extends string
>(phone: T) => {
  const countryCode: string = getPhoneCountryCode(phone as string) as unknown as string;
  return (
    countryCode !== ""
      ? stripLeading(stripLeading(
          phone.trim(),
          "+","00"
        ) as string, countryCode)
      : phone
  ) as unknown as GetCountryPhoneNumber<T>
}


export const asPhoneNumber = <
  T extends string,
  F extends PhoneFormat,
>(
  phone: T & PhoneNumber<T>,
  format: F = "Dotted (e.g., 456.555.1212)" as F
) => {
  if (!isPhoneNumber(phone)) {
    throw new Error(`Invalid phone number presented to asPhoneNumber(phone,format)!`);
  }


}
