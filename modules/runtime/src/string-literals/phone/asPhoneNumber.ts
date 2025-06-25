// const convert = (
//   countryCode: string,
//   phone: string,
//   delimiter: string,
//   para: boolean
// ) => {
//   const chars: string = stripChars(phone, "(", ")") as string;
//   const parts: string[] = chars.trim().split(/[-. ]/);
//   const isRegional = parts.length === 2 ? true : false;
//   const isCountry = parts.length === 3 ? true : false;
//   const isShortCode = parts.length === 1 && phone.split("").length < 7 ? true : false;

//   const replacement = isShortCode
//     ? phone
//     : isRegional
//     ? parts.join(delimiter)
//     : isCountry && para
//     ? `(${parts[0]}) ${parts.slice(1).join(delimiter)}`
//     : isCountry
//     ? parts.join(delimiter)
//     : undefined;

//   if (!replacement) {
//     throw new Error(`invalid phone number: ${phone}. Unable to parse!`)
//   }

//   return countryCode === ""
//     ? replacement
//     : `+${countryCode} ${replacement}`;
// }

// /**
//  * **asPhoneNumber**`(phone, format)`
//  *
//  * Receives a phone number and returns it as a well formatted version.
//  */
// export const asPhoneNumber = <
//   T extends string,
//   F extends PhoneFormat,
// >(
//   phone: T & PhoneNumber<T>,
//   format: F = "Dotted (e.g., 456.555.1212)" as F
// ) => {
//   if (!isPhoneNumber(phone)) {
//     throw new Error(`Invalid phone number presented to asPhoneNumber(phone,format)!`);
//   }
//   const countryCode = getPhoneCountryCode(phone) as unknown as string;
//   const remaining = removePhoneCountryCode(phone) as unknown as string;
//   let result: unknown;

//   switch (format) {
//     case "Dashed (e.g., 456-555-1212)":
//       result = convert(countryCode, remaining, "-", false) as unknown;
//       break;
//     case "Dotted (e.g., 456.555.1212)":
//       result = convert(countryCode, remaining, ".", false) as unknown;
//       break;
//     case "ParaDashed (e.g., (456) 555-1212)":
//       result = convert(countryCode, remaining, "-", true) as unknown;
//       break;
//     case "ParaSpaced (e.g., (456) 555 1212)":
//       result = convert(countryCode, remaining, " ", true) as unknown;
//       break;
//   }

//   return result ;
// }

export const asPhoneFormat = () => `NOT IMPLEMENTED`;
