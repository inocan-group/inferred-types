import { RemovePhoneCountryCode, GetPhoneCountryCode, PhoneFormat, PhoneNumber, ToPhoneFormat } from "src/types/index";
import { asChars, isPhoneNumber, retainWhile, stripChars, stripLeading } from "src/runtime/index";
import { NUMERIC_CHAR } from "src/constants/NumericChar";


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

const convert = (countryCode: string, phone: string, delimiter: string, para: boolean) => {
  const parts = stripChars(phone, "(", ")").trim().split(/[-. ]/);
  const isRegional = parts.length === 2 ? true : false;
  const isCountry = parts.length === 3 ? true : false;
  const isShortCode = parts.length === 1 && asChars(phone).length < 7 ? true : false;

  const replacement = isShortCode
    ? phone
    : isRegional
    ? parts.join(delimiter)
    : isCountry && para
    ? `(${parts[0]}) ${parts.slice(1).join(delimiter)}`
    : isCountry
    ? parts.join(delimiter)
    : undefined;

  if (!replacement) {
    throw new Error(`invalid phone number: ${phone}. Unable to parse!`)
  }

  return countryCode === ""
    ? replacement
    : `+${countryCode} ${replacement}`;
}

/**
 * **asPhoneNumber**`(phone, format)`
 *
 * Receives a phone number and returns it as a well formatted version.
 */
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
  const countryCode = getPhoneCountryCode(phone) as unknown as string;
  const remaining = removePhoneCountryCode(phone) as unknown as string;
  let result: unknown;

  switch (format) {
    case "Dashed (e.g., 456-555-1212)":
      result = convert(countryCode, remaining, "-", false);
      break;
    case "Dotted (e.g., 456.555.1212)":
      result = convert(countryCode, remaining, ".", false);
      break;
    case "ParaDashed (e.g., (456) 555-1212)":
      result = convert(countryCode, remaining, "-", true);
      break;
    case "ParaSpaced (e.g., (456) 555 1212)":
      result = convert(countryCode, remaining, " ", true);
      break;
  }

  return result as ToPhoneFormat<T,F>;
}
