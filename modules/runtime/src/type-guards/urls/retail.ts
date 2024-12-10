import type {
  AmazonUrl,
  AppleUrl,
  BestBuyUrl,
  CostCoUrl,
  CvsUrl,
  DellUrl,
  EbayUrl,
  EtsyUrl,
  HandMUrl,
  HomeDepotUrl,
  IkeaUrl,
  KrogerUrl,
  LowesUrl,
  MacysUrl,
  NikeUrl,
  RetailUrl,
  TargetUrl,
  WalgreensUrl,
  WalmartUrl,
  WayFairUrl,
  WholeFoodsUrl,
  ZaraUrl,
} from "inferred-types/types";
import {
  AMAZON_DNS,
  APPLE_DNS,
  BEST_BUY_DNS,
  COSTCO_DNS,
  CVS_DNS,
  DELL_DNS,
  EBAY_DNS,
  ETSY_DNS,
  HM_DNS,
  HOME_DEPOT_DNS,
  KROGER_DNS,
  MACYS_DNS,
  NIKE_DNS,
  TARGET_DNS,
  WALGREENS_DNS,
  WALMART_DNS,
  WAYFAIR_DNS,
  WHOLE_FOODS_DNS,
  ZARA_DNS,
} from "inferred-types/constants";
import { isString } from "../isString";

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Whole Food Markets**.
 */
export function isWholeFoodsUrl(val: unknown): val is WholeFoodsUrl {
  return isString(val) && WHOLE_FOODS_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **CVS** pharmacy.
 */
export function isCvsUrl(val: unknown): val is CvsUrl {
  return isString(val) && CVS_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Walgreens** pharmacy.
 */
export function isWalgreensUrl(val: unknown): val is WalgreensUrl {
  return isString(val) && WALGREENS_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **CVS** pharmacy.
 */
export function isKrogersUrl(val: unknown): val is KrogerUrl {
  return isString(val) && KROGER_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **CVS** pharmacy.
 */
export function isZaraUrl(val: unknown): val is ZaraUrl {
  return isString(val) && ZARA_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **H&M** retailer.
 */
export function isHmUrl(val: unknown): val is HandMUrl {
  return isString(val) && HM_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Dell** retailer.
 */
export function isDellUrl(val: unknown): val is DellUrl {
  return isString(val) && DELL_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Ikea** retailer.
 */
export function isIkeaUrl(val: unknown): val is IkeaUrl {
  return isString(val) && KROGER_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Lowes** retailer.
 */
export function isLowesUrl(val: unknown): val is LowesUrl {
  return isString(val) && KROGER_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export function isNikeUrl(val: unknown): val is NikeUrl {
  return isString(val) && NIKE_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export function isWayfairUrl(val: unknown): val is WayFairUrl {
  return isString(val) && WAYFAIR_DNS.some(i => val.startsWith(`https://${i}`));
}
/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export function isBestBuyUrl(val: unknown): val is BestBuyUrl {
  return isString(val) && BEST_BUY_DNS.some(i => val.startsWith(`https://${i}`));
}
/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export function isCostCoUrl(val: unknown): val is CostCoUrl {
  return isString(val) && COSTCO_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export function isEtsyUrl(val: unknown): val is EtsyUrl {
  return isString(val) && ETSY_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export function isTargetUrl(val: unknown): val is TargetUrl {
  return isString(val) && TARGET_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export function isEbayUrl(val: unknown): val is EbayUrl {
  return isString(val) && EBAY_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for the **Home Depot** retailer.
 */
export function isHomeDepotUrl(val: unknown): val is HomeDepotUrl {
  return isString(val) && HOME_DEPOT_DNS.some(i => val.startsWith(`https://${i}`));
}
/**
 * type guard which validates that the `val` passed in is a valid URL
 * for the **Macy's** retailer.
 */
export function isMacysUrl(val: unknown): val is MacysUrl {
  return isString(val) && MACYS_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Apple**.
 */
export function isAppleUrl(val: unknown): val is AppleUrl {
  return isString(val) && APPLE_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Walmart**.
 */
export function isWalmartUrl(val: unknown): val is WalmartUrl {
  return isString(val) && WALMART_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Walmart**.
 */
export function isAmazonUrl(val: unknown): val is AmazonUrl {
  return isString(val) && AMAZON_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which check if the passed in value is a Url for one
 * of the top retailers in the world
 */
export function isRetailUrl(val: unknown): val is RetailUrl {
  return isAmazonUrl(val) || isWalgreensUrl(val) || isAppleUrl(val) || isMacysUrl(val) || isEbayUrl(val) || isHomeDepotUrl(val) || isTargetUrl(val) || isEtsyUrl(val) || isCostCoUrl(val) || isBestBuyUrl(val) || isWayfairUrl(val) || isNikeUrl(val) || isLowesUrl(val) || isIkeaUrl(val) || isDellUrl(val) || isHmUrl(val) || isZaraUrl(val) || isKrogersUrl(val) || isWalgreensUrl(val) || isCvsUrl(val) || isWholeFoodsUrl(val);
}
