import type { AmericanExpress, CreditCard, VisaMastercard } from "inferred-types/types";
import { isNumberLike, isString } from "inferred-types/runtime";

export function isVisa(val: unknown): val is Visa {
  if (isString(val) && val.startsWith("4")) {
    const parts = val.split(" ");
    return (
      parts.length === 4
      && parts.every(i => isNumberLike(i) && i.length === 4)
    );
  }
  return false;
}

export function isVisaMastercard(val: unknown): val is VisaMastercard {
  if (isString(val)) {
    const parts = val.split(" ");
    return (
      parts.length === 4
      && parts.every(i => isNumberLike(i) && i.length === 4)
      && ["4", "51", "55", "22", "23", "24", "25", "26", "27"].some(i => val.startsWith(i))
    );
  }
  return false;
}

export function isAmericanExpress(val: unknown): val is AmericanExpress {
  if (isString(val)) {
    const parts = val.split(" ");
    return parts.length === 3
      && parts.every(i => isNumberLike(i)
        && parts[0].length === 4
        && parts[1].length === 6,
      );
  }
  return false;
}

export function isCreditCard(val: unknown): val is CreditCard {
  return isVisaMastercard(val) || isAmericanExpress(val);
}

/**
 * Given a card's long number, attempt to match this to a card type from:
 *
 * - Visa, Mastercard
 * - American Express
 * - Discover
 * - JCB
 * - Diners Club
 * - China UnionPay
 * - Maestro
 * - Solo
 */
export function cardType(cardNumber: string | number) {
  // Step 1: Clean the input by removing non-digit characters
  const cleanedNumber: string = String(cardNumber).replace(/\D/g, "");

  // Step 2: Check if the length is valid for any card type
  const length = cleanedNumber.length;
  if (!isValidLength(length)) {
    return "invalid";
  }

  // Step 3: Check Luhn algorithm
  if (!luhnCheck(cleanedNumber)) {
    return "invalid";
  }

  // Step 4: Determine the card type based on prefix and length
  const cardTypes = [
    { name: "Visa", lengths: [16], prefixes: [/^4/] },
    { name: "Mastercard", lengths: [16], prefixes: [/^(51|52|53|54|55|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/] },
    { name: "American Express", lengths: [15], prefixes: [/^3[47]/] },
    { name: "Discover", lengths: [16], prefixes: [/^(6011|622(12[6-9]|1[3-9]\d|2[0-4]\d|25\d|6[4-9]|7[0-4]|8[0-4]|9\d)|64[4-9]|65)/] },
    { name: "JCB", lengths: [16], prefixes: [/^(35|2131|1800)/] },
    { name: "Diners Club", lengths: [14, 16], prefixes: [/^(30[0-5]|36|38)/] },
    { name: "China UnionPay", lengths: [16, 17, 18, 19], prefixes: [/^(62|88)/] },
    { name: "Maestro", lengths: [12, 13, 14, 15, 16, 17, 18, 19], prefixes: [/^(5018|5020|5038|6304)/] },
    { name: "Solo", lengths: [16, 18, 19], prefixes: [/^(6334|6767)/] },
  ];

  for (const type of cardTypes) {
    if (type.lengths.includes(length)) {
      for (const prefix of type.prefixes) {
        if (prefix.test(cleanedNumber)) {
          return type.name;
        }
      }
    }
  }

  return "invalid";
}

// Helper function to check if the length is valid for any card type
function isValidLength(length: number) {
  const validLengths = [13, 14, 15, 16, 17, 18, 19];
  return validLengths.includes(length);
}

// Implementation of the Luhn algorithm
function luhnCheck(num: string) {
  let sum = 0;
  let double = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = Number.parseInt(num.charAt(i), 10);
    if (double) {
      n *= 2;
      if (n > 9) {
        n -= 9;
      }
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}
